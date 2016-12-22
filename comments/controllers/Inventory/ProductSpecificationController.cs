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

namespace BMS.Controllers.Inventory
{
    public class ProductSpecificationController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ProductSpecification
        public IEnumerable<ProductSpecification> GetProductSpecifications()
        {
            return db.ProductSpecifications.AsEnumerable();
        }

        // GET api/ProductSpecification/5
        public ProductSpecification GetProductSpecification(long id)
        {
            ProductSpecification productspecification = db.ProductSpecifications.Find(id);
            if (productspecification == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productspecification;
        }

        // PUT api/ProductSpecification/5
        public HttpResponseMessage PutProductSpecification(long id, ProductSpecification productspecification)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productspecification.ProductSpecificationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productspecification).State = EntityState.Modified;

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

        // POST api/ProductSpecification
        public HttpResponseMessage PostProductSpecification(ProductSpecification productspecification)
        {
            if (ModelState.IsValid)
            {
                db.ProductSpecifications.Add(productspecification);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productspecification);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productspecification.ProductSpecificationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductSpecification/5
        public HttpResponseMessage DeleteProductSpecification(long id)
        {
            ProductSpecification productspecification = db.ProductSpecifications.Find(id);
            if (productspecification == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductSpecifications.Remove(productspecification);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productspecification);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}