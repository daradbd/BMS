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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Accounting.Configuration.Accounts
{
    public class AccCOAController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/AccCOA
        public IEnumerable<AccCOA> GetAccCOAs(ODataQueryOptions Options)
        {
            //return db.AccCOAs.AsEnumerable();
           return Options.ApplyTo(db.AccCOAs as IQueryable) as IEnumerable<AccCOA>;
        }

        public HttpResponseMessage Get(long id, int FilterType)//Bank=1,Customer=3,Supplier=4,Contra
        {
            long PCOAID=0;
            if (FilterType == 1)
            {
                 var query =( from x in db.AccCOAMappings
                        from y in db.AccCOAs
                        .Where(p =>(p.COAID == x.AccCOAID))
                        .DefaultIfEmpty()
                              select new { x.AccCOAID,  y.BalanceType, y.AccTypeID, y.CompanyID, y.CompanyBranchID, x.AccCOAConfigID }).Where(c => c.AccCOAConfigID == id && c.CompanyID == loginUser.CompanyID).SingleOrDefault();
                PCOAID = (long)query.AccCOAID;
                 
            }
            var result = from a in db.AccCOAs.Where(c => c.ParentCOAID == PCOAID).DefaultIfEmpty()
                select new
                {
                    a.COAID,
                    a.COACode,
                    a.COAName,
                    a.AccType,
                    a.ParentCOAID,
                    a.BalanceType,
                    DrAmount = db.VoucherLists.Where(v => v.COAID == a.COAID && v.DrCr == false).Sum(b => b.Amount),
                    CrAmount = db.VoucherLists.Where(v => v.COAID == a.COAID && v.DrCr == true).Sum(b => b.Amount),
                    

                };
                
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
            
        }

        // GET api/AccCOA/5
        public AccCOA GetAccCOA(long id)
        {
            AccCOA acccoa = db.AccCOAs.Find(id);
            if (acccoa == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return acccoa;
        }

        // PUT api/AccCOA/5
        public HttpResponseMessage PutAccCOA(long id, AccCOA acccoa)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != acccoa.COAID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            acccoa.UpdateBy = loginUser.UserID;
            db.Entry(acccoa).State = EntityState.Modified;

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

        // POST api/AccCOA
        public HttpResponseMessage PostAccCOA(AccCOA acccoa)
        {
            if (ModelState.IsValid)
            {
                acccoa.InsertBy = loginUser.UserID;
                db.AccCOAs.Add(acccoa);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, acccoa);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = acccoa.COAID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AccCOA/5
        public HttpResponseMessage DeleteAccCOA(long id)
        {
            AccCOA acccoa = db.AccCOAs.Find(id);
            if (acccoa == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AccCOAs.Remove(acccoa);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, acccoa);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}