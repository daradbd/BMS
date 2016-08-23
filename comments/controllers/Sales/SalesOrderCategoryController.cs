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
using BMS.Models.Sales;
using BMS.Models;

namespace BMS.Controllers.Sales
{
    public class SalesOrderCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesOrderCategory
        public IEnumerable<SalesOrderCategory> GetSalesOrderCategories()
        {
            return db.SalesOrderCategories.AsEnumerable();
        }

        // GET api/SalesOrderCategory/5
        public SalesOrderCategory GetSalesOrderCategory(long id)
        {
            SalesOrderCategory salesordercategory = db.SalesOrderCategories.Find(id);
            if (salesordercategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesordercategory;
        }

        // PUT api/SalesOrderCategory/5
        public HttpResponseMessage PutSalesOrderCategory(long id, SalesOrderCategory salesordercategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesordercategory.SalesOrderCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesordercategory.UpdateBy = loginUser.UserID;
            db.Entry(salesordercategory).State = EntityState.Modified;

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

        // POST api/SalesOrderCategory
        public HttpResponseMessage PostSalesOrderCategory(SalesOrderCategory salesordercategory)
        {
            if (ModelState.IsValid)
            {
                salesordercategory.InsertBy = loginUser.UserID;
                db.SalesOrderCategories.Add(salesordercategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesordercategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesordercategory.SalesOrderCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesOrderCategory/5
        public HttpResponseMessage DeleteSalesOrderCategory(long id)
        {
            SalesOrderCategory salesordercategory = db.SalesOrderCategories.Find(id);
            if (salesordercategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesOrderCategories.Remove(salesordercategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesordercategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}