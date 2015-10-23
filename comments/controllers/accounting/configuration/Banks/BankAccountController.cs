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
    public class BankAccountController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/BankAccount
        public IEnumerable<BankAccount> GetBankAccounts()
        {
            return db.BankAccounts.AsEnumerable();
        }

        // GET api/BankAccount/5
        public BankAccount GetBankAccount(long id)
        {
            BankAccount bankaccount = db.BankAccounts.Find(id);
            if (bankaccount == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankaccount;
        }

        // PUT api/BankAccount/5
        public HttpResponseMessage PutBankAccount(long id, BankAccount bankaccount)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankaccount.BankAccountID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(bankaccount).State = EntityState.Modified;

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

        // POST api/BankAccount
        public HttpResponseMessage PostBankAccount(BankAccount bankaccount)
        {
            if (ModelState.IsValid)
            {
                             //LoginUser loginUser=new LoginUser();
                //long? i = loginUser.UserID;
                string bankCode=db.Banks.Where(b=>b.BankID==bankaccount.BankID).Select(s=>s.BankCode).SingleOrDefault();
                string brakBranchCode=db.BankBranches.Where(b=>b.BankBranchID==bankaccount.BankBranchID).Select(s=>s.BankBranchCode).SingleOrDefault();
                ControlCOA controlCOA = new ControlCOA();
                bankaccount.AssetCOAID=controlCOA.CreateCOA(bankCode+"-"+brakBranchCode+"-"+bankaccount.BankAccountNumber,3);
                bankaccount.LiabilityCOAID = controlCOA.CreateCOA(bankCode + "-" + brakBranchCode + "-" + bankaccount.BankAccountNumber, 10002);
                bankaccount.ExpenseCOAID = controlCOA.CreateCOA(bankCode + "-" + brakBranchCode + "-" + bankaccount.BankAccountNumber, 10004);
                bankaccount.IncomeCOAID = controlCOA.CreateCOA(bankCode + "-" + brakBranchCode + "-" + bankaccount.BankAccountNumber, 10003);

                db.BankAccounts.Add(bankaccount);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankaccount);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankaccount.BankAccountID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankAccount/5
        public HttpResponseMessage DeleteBankAccount(long id)
        {
            BankAccount bankaccount = db.BankAccounts.Find(id);
            if (bankaccount == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankAccounts.Remove(bankaccount);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankaccount);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}