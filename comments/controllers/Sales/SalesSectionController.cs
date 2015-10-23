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
using BMS.Models.Production;
using BMS.Models;

namespace BMS.Controllers.Sales
{
    public class SalesSectionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalesSection
        public IEnumerable<SalesSection> GetSalesSections()
        {
            return db.SalesSections.AsEnumerable();
        }

        // GET api/SalesSection/5
        public SalesSection GetSalesSection(long id)
        {
            SalesSection salessection = db.SalesSections.Find(id);
            if (salessection == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salessection;
        }

        // PUT api/SalesSection/5
        public HttpResponseMessage PutSalesSection(long id, SalesSection salessection)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salessection.SalesSectionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salessection).State = EntityState.Modified;

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

        // POST api/SalesSection
        public HttpResponseMessage PostSalesSection(SalesSection salessection)
        {
            if (ModelState.IsValid)
            {
                db.SalesSections.Add(salessection);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salessection);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salessection.SalesSectionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesSection/5
        public HttpResponseMessage DeleteSalesSection(long id)
        {
            SalesSection salessection = db.SalesSections.Find(id);
            if (salessection == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesSections.Remove(salessection);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salessection);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}