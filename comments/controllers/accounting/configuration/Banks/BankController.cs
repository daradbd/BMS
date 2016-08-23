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
    public class BankController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Bank
        public IEnumerable<Bank> GetBanks()
        {
            return db.Banks.AsEnumerable();
        }

        // GET api/Bank/5
        public Bank GetBank(long id)
        {
            Bank bank = db.Banks.Find(id);
            if (bank == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bank;
        }

        // PUT api/Bank/5
        public HttpResponseMessage PutBank(long id, Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bank.BankID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            bank.UpdateBy = loginUser.UserID;
            db.Entry(bank).State = EntityState.Modified;

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

        // POST api/Bank
        public HttpResponseMessage PostBank(Bank bank)
        {
            if (ModelState.IsValid)
            {
                bank.InsertBy = loginUser.UserID;
                db.Banks.Add(bank);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bank);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bank.BankID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Bank/5
        public HttpResponseMessage DeleteBank(long id)
        {
            Bank bank = db.Banks.Find(id);
            if (bank == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Banks.Remove(bank);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bank);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}