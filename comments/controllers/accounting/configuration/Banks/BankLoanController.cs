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
    public class BankLoanController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankLoan
        public IEnumerable<BankLoan> GetBankLoans()
        {
            var bankloans = db.BankLoans.Include(b => b.Bank).Include(b => b.BankBranch).Include(b => b.BankLoanType);
            return bankloans.AsEnumerable();
        }

        // GET api/BankLoan/5
        public BankLoan GetBankLoan(long id)
        {
            BankLoan bankloan = db.BankLoans.Find(id);
            if (bankloan == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankloan;
        }

        // PUT api/BankLoan/5
        public HttpResponseMessage PutBankLoan(long id, BankLoan bankloan)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankloan.BankLoanID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            bankloan.BankLoanType = null;
            bankloan.Bank = null;
            bankloan.BankBranch = null;
            db.Entry(bankloan).State = EntityState.Modified;

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

        // POST api/BankLoan
        public HttpResponseMessage PostBankLoan(BankLoan bankloan)
        {
            if (ModelState.IsValid)
            {
                db.BankLoans.Add(bankloan);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankloan);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankloan.BankLoanID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankLoan/5
        public HttpResponseMessage DeleteBankLoan(long id)
        {
            BankLoan bankloan = db.BankLoans.Find(id);
            if (bankloan == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankLoans.Remove(bankloan);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankloan);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}