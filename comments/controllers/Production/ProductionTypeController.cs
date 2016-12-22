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
    public class ProductionTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductionType
        public IEnumerable<ProductionType> GetProductionTypes()
        {
            return db.ProductionTypes.AsEnumerable();
        }

        // GET api/ProductionType/5
        public ProductionType GetProductionType(long id)
        {
            ProductionType productiontype = db.ProductionTypes.Find(id);
            if (productiontype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productiontype;
        }

        // PUT api/ProductionType/5
        public HttpResponseMessage PutProductionType(long id, ProductionType productiontype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productiontype.ProductionTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            productiontype.UpdateBy = loginUser.UserID;
            db.Entry(productiontype).State = EntityState.Modified;

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

        // POST api/ProductionType
        public HttpResponseMessage PostProductionType(ProductionType productiontype)
        {
            if (ModelState.IsValid)
            {
                productiontype.InsertBy = loginUser.UserID;
                db.ProductionTypes.Add(productiontype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productiontype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productiontype.ProductionTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductionType/5
        public HttpResponseMessage DeleteProductionType(long id)
        {
            ProductionType productiontype = db.ProductionTypes.Find(id);
            if (productiontype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductionTypes.Remove(productiontype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productiontype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}