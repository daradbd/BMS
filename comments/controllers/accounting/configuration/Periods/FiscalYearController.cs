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
using BMS.Models.Accounting.Configuration.Periods;
using BMS.Models;

namespace BMS.Controllers.Accounting.Configuration.Periods
{
    public class FiscalYearController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/FiscalYear
        public IEnumerable<FiscalYear> GetFiscalYears()
        {
            return db.FiscalYears.AsEnumerable();
        }

        // GET api/FiscalYear/5
        public FiscalYear GetFiscalYear(long id)
        {
            FiscalYear fiscalyear = db.FiscalYears.Find(id);
            if (fiscalyear == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return fiscalyear;
        }

        // PUT api/FiscalYear/5
        public HttpResponseMessage PutFiscalYear(long id, FiscalYear fiscalyear)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != fiscalyear.FiscalYearID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(fiscalyear).State = EntityState.Modified;

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

        // POST api/FiscalYear
        public HttpResponseMessage PostFiscalYear(FiscalYear fiscalyear)
        {
            if (ModelState.IsValid)
            {
                db.FiscalYears.Add(fiscalyear);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, fiscalyear);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = fiscalyear.FiscalYearID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/FiscalYear/5
        public HttpResponseMessage DeleteFiscalYear(long id)
        {
            FiscalYear fiscalyear = db.FiscalYears.Find(id);
            if (fiscalyear == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.FiscalYears.Remove(fiscalyear);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, fiscalyear);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}