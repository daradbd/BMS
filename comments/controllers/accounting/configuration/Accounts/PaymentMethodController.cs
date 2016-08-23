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
using BMS.Models.Accounting.Configuration.Accounts;
using BMS.Models;

namespace BMS.Controllers.Accounting.Configuration.Accounts
{
    public class PaymentMethodController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PaymentMethod
        public HttpResponseMessage GetPaymentMethods()
        {
            var result = from pm in db.PaymentMethods.DefaultIfEmpty()
                         select new
                         {
                             pm.PaymentMethodID,
                             pm.PaymentMethodCode,
                             pm.PaymentMethodName,
                             pm.AccountingHeadID,
                             pm.RefText,
                             pm.CompanyID,
                             pm.Remarks,
                             pm.StatusID,

                             AccCOAID = db.AccCOAs.Where(r => ((r.COAID == db.AccCOAMappings.FirstOrDefault(a => a.AccCOAConfigID == pm.AccountingHeadID).AccCOAID)||(r.ParentCOAID == db.AccCOAMappings.FirstOrDefault(a => a.AccCOAConfigID == pm.AccountingHeadID).AccCOAID))&& r.HasChild==false).AsEnumerable()

                          

                         };
            //return db.PaymentMethods.AsEnumerable();

            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/PaymentMethod/5
        public HttpResponseMessage GetPaymentMethod(long id)
        {
            //PaymentMethod paymentmethod = db.PaymentMethods.Find(id);
            //if (paymentmethod == null)
            //{
            //    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            //}

            //return paymentmethod;
            var result = from pm in db.PaymentMethods.DefaultIfEmpty()
                         select new
                         {
                             pm.PaymentMethodID,
                             pm.PaymentMethodCode,
                             pm.PaymentMethodName,
                             pm.AccountingHeadID,
                             pm.RefText,
                             pm.CompanyID,
                             pm.Remarks,
                             pm.StatusID,

                             AccCOAID = db.AccCOAs.Where(r => ((r.COAID == db.AccCOAMappings.FirstOrDefault(a => a.AccCOAConfigID == pm.AccountingHeadID).AccCOAID) || (r.ParentCOAID == db.AccCOAMappings.FirstOrDefault(a => a.AccCOAConfigID == pm.AccountingHeadID).AccCOAID)) && r.HasChild == false).AsEnumerable()



                         };
            //return db.PaymentMethods.AsEnumerable();

            return Request.CreateResponse(HttpStatusCode.OK, result.ToList().FirstOrDefault(a=>a.PaymentMethodID==id));
        }

        // PUT api/PaymentMethod/5
        public HttpResponseMessage PutPaymentMethod(long id, PaymentMethod paymentmethod)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != paymentmethod.PaymentMethodID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            paymentmethod.UpdateBy = loginUser.UserID;
            db.Entry(paymentmethod).State = EntityState.Modified;

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

        // POST api/PaymentMethod
        public HttpResponseMessage PostPaymentMethod(PaymentMethod paymentmethod)
        {
            if (ModelState.IsValid)
            {
                paymentmethod.InsertBy = loginUser.UserID;
                db.PaymentMethods.Add(paymentmethod);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, paymentmethod);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = paymentmethod.PaymentMethodID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PaymentMethod/5
        public HttpResponseMessage DeletePaymentMethod(long id)
        {
            PaymentMethod paymentmethod = db.PaymentMethods.Find(id);
            if (paymentmethod == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PaymentMethods.Remove(paymentmethod);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, paymentmethod);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}