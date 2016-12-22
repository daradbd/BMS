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
using BMS.Models.Accounting.Configuration.Banks;
using BMS.Models;

namespace BMS.Controllers.Accounting.Configuration.Banks
{
    public class BankLoanTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankLoanType
        public IEnumerable<BankLoanType> GetBankLoanTypes()
        {
            return db.BankLoanTypes.AsEnumerable();
        }

        // GET api/BankLoanType/5
        public BankLoanType GetBankLoanType(long id)
        {
            BankLoanType bankloantype = db.BankLoanTypes.Find(id);
            if (bankloantype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankloantype;
        }

        // PUT api/BankLoanType/5
        public HttpResponseMessage PutBankLoanType(long id, BankLoanType bankloantype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankloantype.BankLoanTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(bankloantype).State = EntityState.Modified;

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

        // POST api/BankLoanType
        public HttpResponseMessage PostBankLoanType(BankLoanType bankloantype)
        {
            if (ModelState.IsValid)
            {
                db.BankLoanTypes.Add(bankloantype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankloantype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankloantype.BankLoanTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankLoanType/5
        public HttpResponseMessage DeleteBankLoanType(long id)
        {
            BankLoanType bankloantype = db.BankLoanTypes.Find(id);
            if (bankloantype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankLoanTypes.Remove(bankloantype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankloantype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}