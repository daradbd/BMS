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
    public class PurchaseBillPaymentController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PurchaseBillPayment
        public IEnumerable<PurchaseBillPayment> GetPurchaseBillPayments()
        {
            var purchasebillpayments = db.PurchaseBillPayments.Include(p => p.Collaborator).Include(p => p.ProcesStatus);
            return purchasebillpayments.AsEnumerable();
        }

        // GET api/PurchaseBillPayment/5
        public PurchaseBillPayment GetPurchaseBillPayment(long id)
        {
            PurchaseBillPayment purchasebillpayment = db.PurchaseBillPayments.Find(id);
            if (purchasebillpayment == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasebillpayment;
        }

        // PUT api/PurchaseBillPayment/5
        public HttpResponseMessage PutPurchaseBillPayment(long id, PurchaseBillPayment purchasebillpayment)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasebillpayment.PurchaseBillPaymentID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchasebillpayment).State = EntityState.Modified;

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

        // POST api/PurchaseBillPayment
        public HttpResponseMessage PostPurchaseBillPayment(PurchaseBillPayment purchasebillpayment)
        {
            if (ModelState.IsValid)
            {
                ControlVoucher controlvoucher = new ControlVoucher();
                long SupplierCOAID = (long)db.Collaborators.Where(c => c.CollaboratorID == purchasebillpayment.SupplierID).Select(c => c.SupplierCOAID).FirstOrDefault();
                purchasebillpayment.VoucherNO = controlvoucher.CreateVoucher( SupplierCOAID,(long)purchasebillpayment.CreditTo, (decimal)purchasebillpayment.PaymentTotal, (long)1, (DateTime)purchasebillpayment.Date);
                db.PurchaseBillPayments.Add(purchasebillpayment);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasebillpayment);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasebillpayment.PurchaseBillPaymentID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseBillPayment/5
        public HttpResponseMessage DeletePurchaseBillPayment(long id)
        {
            PurchaseBillPayment purchasebillpayment = db.PurchaseBillPayments.Find(id);
            if (purchasebillpayment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseBillPayments.Remove(purchasebillpayment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasebillpayment);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}