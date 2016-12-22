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
using BMS.Models.Inventory;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Inventory
{
    public class UOMCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/UOMCategory
        public IEnumerable<UOMCategory> GetUOMCategories(ODataQueryOptions Options)
        {
            var UOMCategories = Options.ApplyTo(db.UOMCategories) as IEnumerable<UOMCategory>;
            return UOMCategories;
        }

        // GET api/UOMCategory/5
        public UOMCategory GetUOMCategory(long id)
        {
            UOMCategory uomcategory = db.UOMCategories.Find(id);
            if (uomcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return uomcategory;
        }

        // PUT api/UOMCategory/5
        public HttpResponseMessage PutUOMCategory(long id, UOMCategory uomcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != uomcategory.UOMCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(uomcategory).State = EntityState.Modified;

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

        // POST api/UOMCategory
        public HttpResponseMessage PostUOMCategory(UOMCategory uomcategory)
        {
            if (ModelState.IsValid)
            {
                db.UOMCategories.Add(uomcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, uomcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = uomcategory.UOMCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/UOMCategory/5
        public HttpResponseMessage DeleteUOMCategory(long id)
        {
            UOMCategory uomcategory = db.UOMCategories.Find(id);
            if (uomcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.UOMCategories.Remove(uomcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, uomcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}