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
    public class PurchaseRequisitionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseRequisition
        public IEnumerable<PurchaseRequisition> GetPurchaseRequisitions(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.PurchaseRequisitions.AsQueryable().Include(r => r.Collaborator).Include(r => r.ProcesStatus).Include(r => r.ProjectSetup).Include(w => w.WorkPlant)) as IEnumerable<PurchaseRequisition>;
        }

        // GET api/PurchaseRequisition/5
        public PurchaseRequisition GetPurchaseRequisition(long id)
        {
            PurchaseRequisition purchaserequisition = db.PurchaseRequisitions.Find(id);
            if (purchaserequisition == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchaserequisition;
        }

        // PUT api/PurchaseRequisition/5
        public HttpResponseMessage PutPurchaseRequisition(long id, PurchaseRequisition purchaserequisition)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchaserequisition.PurchaseRequisitionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            purchaserequisition.ProcesStatus = null;
            purchaserequisition.Collaborator = null;
            purchaserequisition.WorkPlant = null;
            purchaserequisition.UpdateBy = loginUser.UserID;

            db.Entry(purchaserequisition).State = EntityState.Modified;

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

        // POST api/PurchaseRequisition
        public HttpResponseMessage PostPurchaseRequisition(PurchaseRequisition purchaserequisition)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "APR-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.PurchaseRequisitions.Where(r => r.PurchaseRequisitionCode.StartsWith(CustomCode)).Select(r => r.PurchaseRequisitionCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string PQCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                purchaserequisition.PurchaseRequisitionCode = PQCode;
                purchaserequisition.InsertBy = loginUser.UserID;

                db.PurchaseRequisitions.Add(purchaserequisition);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchaserequisition);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchaserequisition.PurchaseRequisitionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseRequisition/5
        public HttpResponseMessage DeletePurchaseRequisition(long id)
        {
            PurchaseRequisition purchaserequisition = db.PurchaseRequisitions.Find(id);
            purchaserequisition.Collaborator = db.Collaborators.Where(c => c.CollaboratorID == id).FirstOrDefault();

            if (purchaserequisition == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseRequisitions.Remove(purchaserequisition);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchaserequisition);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}