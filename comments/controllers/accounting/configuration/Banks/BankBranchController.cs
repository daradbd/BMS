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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Accounting.Configuration.Banks
{
    public class BankBranchController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/BankBranch
        public IEnumerable<BankBranch> GetBankBranches(ODataQueryOptions Options)
        {
            //return db.BankBranches.AsEnumerable();
            return Options.ApplyTo(db.BankBranches.AsQueryable().Include(s => s.Bank).Include(s => s.Country).Include(s => s.City)) as IEnumerable<BankBranch>;
        }

        // GET api/BankBranch/5
        public BankBranch GetBankBranch(long id)
        {
            BankBranch bankbranch = db.BankBranches.Find(id);
            if (bankbranch == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return bankbranch;
        }

        // PUT api/BankBranch/5
        public HttpResponseMessage PutBankBranch(long id, BankBranch bankbranch)
        {
            bankbranch.City = null;
            bankbranch.Country = null;
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != bankbranch.BankBranchID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            bankbranch.UpdateBy = loginUser.UserID;
            db.Entry(bankbranch).State = EntityState.Modified;

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

        // POST api/BankBranch
        public HttpResponseMessage PostBankBranch(BankBranch bankbranch)
        {
            if (ModelState.IsValid)
            {
                bankbranch.InsertBy = loginUser.UserID;
                db.BankBranches.Add(bankbranch);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, bankbranch);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = bankbranch.BankBranchID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BankBranch/5
        public HttpResponseMessage DeleteBankBranch(long id)
        {
            BankBranch bankbranch = db.BankBranches.Find(id);
            if (bankbranch == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BankBranches.Remove(bankbranch);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, bankbranch);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}