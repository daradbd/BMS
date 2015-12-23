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

namespace BMS.Controllers.Production
{
    public class ProductionOrderCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductionOrderCategory
        public IEnumerable<ProductionOrderCategory> GetProductionOrderCategories()
        {
            return db.ProductionOrderCategories.AsEnumerable();
        }

        // GET api/ProductionOrderCategory/5
        public ProductionOrderCategory GetProductionOrderCategory(long id)
        {
            ProductionOrderCategory productionordercategory = db.ProductionOrderCategories.Find(id);
            if (productionordercategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productionordercategory;
        }

        // PUT api/ProductionOrderCategory/5
        public HttpResponseMessage PutProductionOrderCategory(long id, ProductionOrderCategory productionordercategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productionordercategory.ProductionOrderCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productionordercategory).State = EntityState.Modified;

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

        // POST api/ProductionOrderCategory
        public HttpResponseMessage PostProductionOrderCategory(ProductionOrderCategory productionordercategory)
        {
            if (ModelState.IsValid)
            {
                productionordercategory.InsertBy = loginUser.UserID;
                db.ProductionOrderCategories.Add(productionordercategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productionordercategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productionordercategory.ProductionOrderCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductionOrderCategory/5
        public HttpResponseMessage DeleteProductionOrderCategory(long id)
        {
            ProductionOrderCategory productionordercategory = db.ProductionOrderCategories.Find(id);
            if (productionordercategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductionOrderCategories.Remove(productionordercategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productionordercategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}