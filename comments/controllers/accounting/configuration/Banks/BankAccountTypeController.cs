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
    public class BankAccountTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankAccountType
        public IEnumerable<BankAccountType> GetBankAccountTypes()
        {
            return db.BankAccountTypes.AsEnumerable();
        }

        // GET api/BankAccountType/5
        public BankAccountType GetBankAccountType(long id)
        {
            BankAccountType bankaccounttype = db.BankAccountTypes.Find(id);
            if (bankaccounttype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankaccounttype;
        }

        // PUT api/BankAccountType/5
        public HttpResponseMessage PutBankAccountType(long id, BankAccountType bankaccounttype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankaccounttype.BankAccountTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(bankaccounttype).State = EntityState.Modified;

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

        // POST api/BankAccountType
        public HttpResponseMessage PostBankAccountType(BankAccountType bankaccounttype)
        {
            if (ModelState.IsValid)
            {
                db.BankAccountTypes.Add(bankaccounttype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankaccounttype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankaccounttype.BankAccountTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankAccountType/5
        public HttpResponseMessage DeleteBankAccountType(long id)
        {
            BankAccountType bankaccounttype = db.BankAccountTypes.Find(id);
            if (bankaccounttype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankAccountTypes.Remove(bankaccounttype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankaccounttype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}