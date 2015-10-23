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
using BMS.Models.Production;
using BMS.Models;
using BMS.Models.Accounting.Configuration.Accounts;

namespace BMS.Controllers.Sales
{
    public class SalesReceivePaymentController : ApiController
    {
        private UsersContext db = new UsersContext();
        List<AccCOA> AccCOAList = new List<AccCOA>();

        // GET api/SalesReceivePayment
        public IEnumerable<SalesReceivePayment> GetSalesReceivePayments()
        {

            var salesreceivepayments = db.SalesReceivePayments.Include(s => s.Collaborator).Include(s => s.ProcesStatus).Include(p=>p.PaymentMethod);
            return salesreceivepayments.AsEnumerable();
        }


        // GET api/SalesReceivePayment/5
        public SalesReceivePayment GetSalesReceivePayment(long id)
        {
            SalesReceivePayment salesreceivepayment = db.SalesReceivePayments.Find(id);
            if (salesreceivepayment == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesreceivepayment;
        }

        // PUT api/SalesReceivePayment/5
        public HttpResponseMessage PutSalesReceivePayment(long id, SalesReceivePayment salesreceivepayment)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesreceivepayment.SalesReceivePaymentID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            salesreceivepayment.PaymentMethod = null;
            salesreceivepayment.Collaborator = null;
            salesreceivepayment.ProcesStatus = null;
            db.Entry(salesreceivepayment).State = EntityState.Modified;

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

        // POST api/SalesReceivePayment
        public HttpResponseMessage PostSalesReceivePayment(SalesReceivePayment salesreceivepayment)
        {
            if (ModelState.IsValid)
            {
                ControlVoucher controlvoucher = new ControlVoucher();
                string CustomCode = "SP-" + DateTime.Now.ToString("yyyyMMdd");
                long CustomerCOAID =(long) db.Collaborators.Where(c => c.CollaboratorID == salesreceivepayment.CustomerID).Select(c => c.CustomerCOAID).FirstOrDefault();
                salesreceivepayment.VoucherNO= controlvoucher.CreateVoucher((long)salesreceivepayment.DepositTo, CustomerCOAID, (decimal)salesreceivepayment.PaymentTotal, (long)1, (DateTime)salesreceivepayment.Date);
                int? MaxCode = Convert.ToInt32((db.SalesReceivePayments.Where(r => r.SalesReceivePaymentCode.StartsWith(CustomCode)).Select(r => r.SalesReceivePaymentCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string SPCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                salesreceivepayment.SalesReceivePaymentCode = SPCode;
                salesreceivepayment.Date = DateTime.Now.ToLocalTime();
                db.SalesReceivePayments.Add(salesreceivepayment);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesreceivepayment);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesreceivepayment.SalesReceivePaymentID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesReceivePayment/5
        public HttpResponseMessage DeleteSalesReceivePayment(long id)
        {
            SalesReceivePayment salesreceivepayment = db.SalesReceivePayments.Find(id);
            if (salesreceivepayment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesReceivePayments.Remove(salesreceivepayment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesreceivepayment);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}