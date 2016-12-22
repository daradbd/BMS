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
    public class BankLoanTransactionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankLoanTransaction
        public IEnumerable<BankLoanTransaction> GetBankLoanTransactions()
        {
            return db.BankLoanTransactions.AsEnumerable();
        }

        // GET api/BankLoanTransaction/5
        public BankLoanTransaction GetBankLoanTransaction(long id)
        {
            BankLoanTransaction bankloantransaction = db.BankLoanTransactions.Find(id);
            if (bankloantransaction == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankloantransaction;
        }

        // PUT api/BankLoanTransaction/5
        public HttpResponseMessage PutBankLoanTransaction(long id, BankLoanTransaction bankloantransaction)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankloantransaction.BankLoanTransactionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(bankloantransaction).State = EntityState.Modified;

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

        // POST api/BankLoanTransaction
        public HttpResponseMessage PostBankLoanTransaction(BankLoanTransaction bankloantransaction)
        {
            if (ModelState.IsValid)
            {
                db.BankLoanTransactions.Add(bankloantransaction);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankloantransaction);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankloantransaction.BankLoanTransactionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankLoanTransaction/5
        public HttpResponseMessage DeleteBankLoanTransaction(long id)
        {
            BankLoanTransaction bankloantransaction = db.BankLoanTransactions.Find(id);
            if (bankloantransaction == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankLoanTransactions.Remove(bankloantransaction);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankloantransaction);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}