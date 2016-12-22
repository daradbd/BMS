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
    public class ProductCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductCategory
        public IEnumerable<ProductCategory> GetProductCategories()
        {
            return db.ProductCategories.AsEnumerable();
        }

        // GET api/ProductCategory/5
        public ProductCategory GetProductCategory(long id)
        {
            ProductCategory productcategory = db.ProductCategories.Find(id);
            if (productcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productcategory;
        }

        // PUT api/ProductCategory/5
        public HttpResponseMessage PutProductCategory(long id, ProductCategory productcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productcategory.ProductCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            productcategory.UpdateBy = loginUser.UserID;
            db.Entry(productcategory).State = EntityState.Modified;

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

        // POST api/ProductCategory
        public HttpResponseMessage PostProductCategory(ProductCategory productcategory)
        {
            if (ModelState.IsValid)
            {
                productcategory.InsertBy = loginUser.UserID;
                db.ProductCategories.Add(productcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productcategory.ProductCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductCategory/5
        public HttpResponseMessage DeleteProductCategory(long id)
        {
            ProductCategory productcategory = db.ProductCategories.Find(id);
            if (productcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductCategories.Remove(productcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}