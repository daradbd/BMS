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
    public class ProductBrandController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ProductBrand
        public IEnumerable<ProductBrand> GetProductBrands()
        {
            return db.ProductBrands.AsEnumerable();
        }

        // GET api/ProductBrand/5
        public ProductBrand GetProductBrand(long id)
        {
            ProductBrand productbrand = db.ProductBrands.Find(id);
            if (productbrand == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productbrand;
        }

        // PUT api/ProductBrand/5
        public HttpResponseMessage PutProductBrand(long id, ProductBrand productbrand)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productbrand.ProductBrandID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productbrand).State = EntityState.Modified;

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

        // POST api/ProductBrand
        public HttpResponseMessage PostProductBrand(ProductBrand productbrand)
        {
            if (ModelState.IsValid)
            {
                db.ProductBrands.Add(productbrand);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productbrand);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productbrand.ProductBrandID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductBrand/5
        public HttpResponseMessage DeleteProductBrand(long id)
        {
            ProductBrand productbrand = db.ProductBrands.Find(id);
            if (productbrand == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductBrands.Remove(productbrand);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productbrand);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}