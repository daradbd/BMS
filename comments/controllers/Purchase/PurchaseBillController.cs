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

namespace BMS.Controllers.Purchase
{
    public class PurchaseBillController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseBill
        public IEnumerable<PurchaseBill> GetPurchaseBills()
        {
            var purchasebills = db.PurchaseBills.Include(p => p.Collaborator).Include(p => p.ProcesStatus).Include(p => p.ProjectSetup);
            return purchasebills.AsEnumerable();
        }

        // GET api/PurchaseBill/5
        public PurchaseBill GetPurchaseBill(long id)
        {
            PurchaseBill purchasebill = db.PurchaseBills.Find(id);
            if (purchasebill == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasebill;
        }

        // PUT api/PurchaseBill/5
        public HttpResponseMessage PutPurchaseBill(long id, PurchaseBill purchasebill)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasebill.PurchaseBillID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchasebill).State = EntityState.Modified;

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

        // POST api/PurchaseBill
        public HttpResponseMessage PostPurchaseBill(PurchaseBill purchasebill)
        {
            if (ModelState.IsValid)
            {
                ControlVoucher controlvoucher = new ControlVoucher();

                var PurchaseOrder = db.PurchaseOrders.Where(o => o.PurchaseOrderID == purchasebill.PurchaseOrderID).SingleOrDefault();
                long PurchaseCOAID =(long) PurchaseOrder.PurchaseOrderCategory.COAID;

                long SupplierCOAID = (long)db.Collaborators.Where(c => c.CollaboratorID == PurchaseOrder.SupplierID).Select(c => c.SupplierCOAID).FirstOrDefault();

                purchasebill.VoucherNO = controlvoucher.CreateVoucher(PurchaseCOAID, SupplierCOAID, (decimal)purchasebill.GrandTotal, (long)1, (DateTime)purchasebill.Date);
                purchasebill.InsertBy = loginUser.UserID;       
                db.PurchaseBills.Add(purchasebill);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasebill);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasebill.PurchaseBillID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseBill/5
        public HttpResponseMessage DeletePurchaseBill(long id)
        {
            PurchaseBill purchasebill = db.PurchaseBills.Find(id);
            if (purchasebill == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseBills.Remove(purchasebill);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasebill);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}