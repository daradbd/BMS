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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Production
{
    public class ProductCostingDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductCostingDescription
        public IEnumerable<ProductCostingDescription> GetProductCostingDescriptions(ODataQueryOptions Options)
        {
           // return db.ProductCostingDescriptions.AsEnumerable();
            return Options.ApplyTo(db.ProductCostingDescriptions.AsQueryable().Include(a=>a.UOM).Include(a=>a.Product)) as IEnumerable<ProductCostingDescription>;
        }

        // GET api/ProductCostingDescription/5
        public ProductCostingDescription GetProductCostingDescription(long id)
        {
            ProductCostingDescription productcostingdescription = db.ProductCostingDescriptions.Find(id);
            if (productcostingdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productcostingdescription;
        }

        // PUT api/ProductCostingDescription/5
        public HttpResponseMessage PutProductCostingDescription(long id, ProductCostingDescription productcostingdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productcostingdescription.ProductCostingDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            productcostingdescription.UpdateBy = loginUser.UserID;
            db.Entry(productcostingdescription).State = EntityState.Modified;

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

        // POST api/ProductCostingDescription
        public HttpResponseMessage PostProductCostingDescription(ProductCostingDescription productcostingdescription)
        {
            SalesQuotationDescription salesquotationdescription = db.SalesQuotationDescriptions.Where(q => (q.SalesQuotationID == productcostingdescription.SalesQuotationID) && (q.SalesSectionID == productcostingdescription.SalesSectionID) && (q.ProductID == productcostingdescription.ProductID)).FirstOrDefault();
            if (ModelState.IsValid)
            {

                productcostingdescription.InsertBy = loginUser.UserID;
                db.Entry(productcostingdescription).State = productcostingdescription.ProductCostingDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;

                db.SaveChanges();

                salesquotationdescription.FinalMRP = Convert.ToDecimal(productcostingdescription.FinalMRP);
                db.Entry(salesquotationdescription).State = EntityState.Modified;
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productcostingdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productcostingdescription.ProductCostingDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductCostingDescription/5
        public HttpResponseMessage DeleteProductCostingDescription(long id)
        {
            ProductCostingDescription productcostingdescription = db.ProductCostingDescriptions.Find(id);
            if (productcostingdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductCostingDescriptions.Remove(productcostingdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productcostingdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}