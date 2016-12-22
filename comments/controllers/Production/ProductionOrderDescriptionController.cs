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
    public class ProductionOrderDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductionOrderDescription
        public IEnumerable<ProductionOrderDescription> GetProductionOrderDescriptions(ODataQueryOptions Options)
        {
            //var productionorderdescriptions = db.ProductionOrderDescriptions.Include(p => p.Product);
            //return productionorderdescriptions.AsEnumerable();
            return Options.ApplyTo(db.ProductionOrderDescriptions.AsQueryable().Include(b => b.Collaborator).Include(b => b.ProcesStatus).Include(b => b.ProjectSetup).Include(s => s.Product).Include(s => s.Product.ProductCategory).Include(u=>u.UOM)) as IEnumerable<ProductionOrderDescription>;
        }

        // GET api/ProductionOrderDescription/5
        public ProductionOrderDescription GetProductionOrderDescription(long id)
        {
            ProductionOrderDescription productionorderdescription = db.ProductionOrderDescriptions.Find(id);
            if (productionorderdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productionorderdescription;
        }

        // PUT api/ProductionOrderDescription/5
        public HttpResponseMessage PutProductionOrderDescription(long id, ProductionOrderDescription productionorderdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productionorderdescription.ProductionOrderDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            productionorderdescription.UpdateBy = loginUser.UserID;
            db.Entry(productionorderdescription).State = EntityState.Modified;

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

        // POST api/ProductionOrderDescription
        public HttpResponseMessage PostProductionOrderDescription(ProductionOrderDescription productionorderdescription)
        {
            if (ModelState.IsValid)
            {
                //db.ProductionOrderDescriptions.Add(productionorderdescription);
                productionorderdescription.InsertBy = loginUser.UserID;
                db.Entry(productionorderdescription).State = productionorderdescription.ProductionOrderDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productionorderdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productionorderdescription.ProductionOrderDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductionOrderDescription/5
        public HttpResponseMessage DeleteProductionOrderDescription(long id)
        {
            ProductionOrderDescription productionorderdescription = db.ProductionOrderDescriptions.Find(id);
            if (productionorderdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductionOrderDescriptions.Remove(productionorderdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productionorderdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}