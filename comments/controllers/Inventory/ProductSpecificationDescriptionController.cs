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
    public class ProductSpecificationDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ProductSpecificationDescription
        public IEnumerable<ProductSpecificationDescription> GetProductSpecificationDescriptions(ODataQueryOptions Options)
        {
            var productspecificationdescriptions = Options.ApplyTo(db.ProductSpecificationDescriptions.Include(p => p.ProductSpecification)) as IEnumerable<ProductSpecificationDescription>; ;
            return productspecificationdescriptions.AsEnumerable();
        }

        // GET api/ProductSpecificationDescription/5
        public ProductSpecificationDescription GetProductSpecificationDescription(long id)
        {
            ProductSpecificationDescription productspecificationdescription = db.ProductSpecificationDescriptions.Find(id);
            if (productspecificationdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productspecificationdescription;
        }

        // PUT api/ProductSpecificationDescription/5
        public HttpResponseMessage PutProductSpecificationDescription(long id, ProductSpecificationDescription productspecificationdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productspecificationdescription.ProductSpecificationDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productspecificationdescription).State = EntityState.Modified;

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

        // POST api/ProductSpecificationDescription
        public HttpResponseMessage PostProductSpecificationDescription(ProductSpecificationDescription productspecificationdescription)
        {
            if (ModelState.IsValid)
            {
               // db.ProductSpecificationDescriptions.Add(productspecificationdescription);
                productspecificationdescription.ProductSpecification = null;
                db.Entry(productspecificationdescription).State = productspecificationdescription.ProductSpecificationDescriptionID == 0 ?
                   EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productspecificationdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productspecificationdescription.ProductSpecificationDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductSpecificationDescription/5
        public HttpResponseMessage DeleteProductSpecificationDescription(long id)
        {
            ProductSpecificationDescription productspecificationdescription = db.ProductSpecificationDescriptions.Find(id);
            if (productspecificationdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductSpecificationDescriptions.Remove(productspecificationdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productspecificationdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}