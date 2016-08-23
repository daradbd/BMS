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
    public class SalesDeliveryCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesDeliveryCategory
        public IEnumerable<SalesDeliveryCategory> GetSalesDeliveryCategories()
        {
            return db.SalesDeliveryCategories.AsEnumerable();
        }

        // GET api/SalesDeliveryCategory/5
        public SalesDeliveryCategory GetSalesDeliveryCategory(long id)
        {
            SalesDeliveryCategory salesdeliverycategory = db.SalesDeliveryCategories.Find(id);
            if (salesdeliverycategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesdeliverycategory;
        }

        // PUT api/SalesDeliveryCategory/5
        public HttpResponseMessage PutSalesDeliveryCategory(long id, SalesDeliveryCategory salesdeliverycategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesdeliverycategory.SalesDeliveryCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesdeliverycategory.UpdateBy = loginUser.UserID;
            db.Entry(salesdeliverycategory).State = EntityState.Modified;

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

        // POST api/SalesDeliveryCategory
        public HttpResponseMessage PostSalesDeliveryCategory(SalesDeliveryCategory salesdeliverycategory)
        {
            if (ModelState.IsValid)
            {
                salesdeliverycategory.InsertBy = loginUser.UserID;
                db.SalesDeliveryCategories.Add(salesdeliverycategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesdeliverycategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesdeliverycategory.SalesDeliveryCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesDeliveryCategory/5
        public HttpResponseMessage DeleteSalesDeliveryCategory(long id)
        {
            SalesDeliveryCategory salesdeliverycategory = db.SalesDeliveryCategories.Find(id);
            if (salesdeliverycategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesDeliveryCategories.Remove(salesdeliverycategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesdeliverycategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}