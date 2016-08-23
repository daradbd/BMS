using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BMS.Models.Purchase;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Purchase
{
    public class PurchaseOrderController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseOrder
        public IEnumerable<PurchaseOrder> GetPurchaseOrders(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.PurchaseOrders.AsQueryable().Include(r => r.Collaborator).Include(r => r.ProcesStatus).Include(r => r.ProjectSetup).Include(r => r.PurchaseOrderCategory)) as IEnumerable<PurchaseOrder>;
            
        }

        // GET api/PurchaseOrder/5
        public PurchaseOrder GetPurchaseOrder(long id)
        {
            PurchaseOrder purchaseorder = db.PurchaseOrders.Find(id);
            if (purchaseorder == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchaseorder;
        }

        // PUT api/PurchaseOrder/5
        public HttpResponseMessage PutPurchaseOrder(long id, PurchaseOrder purchaseorder)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchaseorder.PurchaseOrderID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            purchaseorder.Collaborator = null;
            purchaseorder.ProcesStatus = null;
            purchaseorder.ProjectSetup = null;
            purchaseorder.UpdateBy = loginUser.UserID;

            db.Entry(purchaseorder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/PurchaseOrder
        public HttpResponseMessage PostPurchaseOrder(PurchaseOrder purchaseorder)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "PO-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.PurchaseOrders.Where(r => r.PurchaseOrderCode.StartsWith(CustomCode)).Select(r => r.PurchaseOrderCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string POCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                purchaseorder.PurchaseOrderCode = POCode;
                purchaseorder.InsertBy = loginUser.UserID;

                db.PurchaseOrders.Add(purchaseorder);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchaseorder);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchaseorder.PurchaseOrderID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseOrder/5
        public HttpResponseMessage DeletePurchaseOrder(long id)
        {
            PurchaseOrder purchaseorder = db.PurchaseOrders.Find(id);
            if (purchaseorder == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseOrders.Remove(purchaseorder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchaseorder);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}