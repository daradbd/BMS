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

namespace BMS.Controllers.Sales
{
    public class SalesBillDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesBillDescription
        public IEnumerable<SalesBillDescription> GetSalesBillDescriptions(ODataQueryOptions Options)
        {
            //var salesbilldescriptions = db.SalesBillDescriptions.Include(s => s.Product).Include(u=>u.UOM);
            //return salesbilldescriptions.AsEnumerable();
            return Options.ApplyTo(db.SalesBillDescriptions.AsQueryable().Include(s => s.Product).Include(s => s.Product.ProductCategory).Include(u => u.UOM)) as IEnumerable<SalesBillDescription>;
        }

        // GET api/SalesBillDescription/5
        public SalesBillDescription GetSalesBillDescription(long id)
        {
            SalesBillDescription salesbilldescription = db.SalesBillDescriptions.Find(id);
            if (salesbilldescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesbilldescription;
        }

        // PUT api/SalesBillDescription/5
        public HttpResponseMessage PutSalesBillDescription(long id, SalesBillDescription salesbilldescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesbilldescription.SalesBillDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salesbilldescription).State = EntityState.Modified;

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

        // POST api/SalesBillDescription
        public HttpResponseMessage PostSalesBillDescription(SalesBillDescription salesbilldescription)
        {
            if (ModelState.IsValid)
            {
                salesbilldescription.InsertBy = loginUser.UserID;
                db.SalesBillDescriptions.Add(salesbilldescription);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesbilldescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesbilldescription.SalesBillDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesBillDescription/5
        public HttpResponseMessage DeleteSalesBillDescription(long id)
        {
            SalesBillDescription salesbilldescription = db.SalesBillDescriptions.Find(id);
            if (salesbilldescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesBillDescriptions.Remove(salesbilldescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesbilldescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}