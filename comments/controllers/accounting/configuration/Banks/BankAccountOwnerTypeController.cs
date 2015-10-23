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
    public class BankAccountOwnerTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankAccountOwnerType
        public IEnumerable<BankAccountOwnerType> GetBankAccountOwnerTypes()
        {
            return db.BankAccountOwnerTypes.AsEnumerable();
        }

        // GET api/BankAccountOwnerType/5
        public BankAccountOwnerType GetBankAccountOwnerType(long id)
        {
            BankAccountOwnerType bankaccountownertype = db.BankAccountOwnerTypes.Find(id);
            if (bankaccountownertype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankaccountownertype;
        }

        // PUT api/BankAccountOwnerType/5
        public HttpResponseMessage PutBankAccountOwnerType(long id, BankAccountOwnerType bankaccountownertype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankaccountownertype.BankAccountOwnerTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(bankaccountownertype).State = EntityState.Modified;

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

        // POST api/BankAccountOwnerType
        public HttpResponseMessage PostBankAccountOwnerType(BankAccountOwnerType bankaccountownertype)
        {
            if (ModelState.IsValid)
            {
                db.BankAccountOwnerTypes.Add(bankaccountownertype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankaccountownertype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankaccountownertype.BankAccountOwnerTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankAccountOwnerType/5
        public HttpResponseMessage DeleteBankAccountOwnerType(long id)
        {
            BankAccountOwnerType bankaccountownertype = db.BankAccountOwnerTypes.Find(id);
            if (bankaccountownertype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankAccountOwnerTypes.Remove(bankaccountownertype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankaccountownertype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}