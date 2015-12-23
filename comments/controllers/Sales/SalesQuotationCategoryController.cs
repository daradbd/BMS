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
    public class SalesQuotationCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesQuotationCategory
        public IEnumerable<SalesQuotationCategory> GetSalesQuotationCategories()
        {
            return db.SalesQuotationCategories.AsEnumerable();
        }

        // GET api/SalesQuotationCategory/5
        public SalesQuotationCategory GetSalesQuotationCategory(long id)
        {
            SalesQuotationCategory salesquotationcategory = db.SalesQuotationCategories.Find(id);
            if (salesquotationcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesquotationcategory;
        }

        // PUT api/SalesQuotationCategory/5
        public HttpResponseMessage PutSalesQuotationCategory(long id, SalesQuotationCategory salesquotationcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesquotationcategory.SalesQuotationCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salesquotationcategory).State = EntityState.Modified;

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

        // POST api/SalesQuotationCategory
        public HttpResponseMessage PostSalesQuotationCategory(SalesQuotationCategory salesquotationcategory)
        {
            if (ModelState.IsValid)
            {
                salesquotationcategory.InsertBy = loginUser.UserID;
                db.SalesQuotationCategories.Add(salesquotationcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesquotationcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesquotationcategory.SalesQuotationCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesQuotationCategory/5
        public HttpResponseMessage DeleteSalesQuotationCategory(long id)
        {
            SalesQuotationCategory salesquotationcategory = db.SalesQuotationCategories.Find(id);
            if (salesquotationcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesQuotationCategories.Remove(salesquotationcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesquotationcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}