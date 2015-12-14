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
    public class SalesDeliveryDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalesDeliveryDescription
        public IEnumerable<SalesDeliveryDescription> GetSalesDeliveryDescriptions(ODataQueryOptions Options)
        {
           // var salesdeliverydescriptions = db.SalesDeliveryDescriptions.Include(s => s.Product).Include(u=>u.UOM);
            return Options.ApplyTo(db.SalesDeliveryDescriptions.AsQueryable().Include(s => s.Product).Include(u=>u.UOM)) as IEnumerable<SalesDeliveryDescription>;
           
        }

        // GET api/SalesDeliveryDescription/5
        public SalesDeliveryDescription GetSalesDeliveryDescription(long id)
        {
            SalesDeliveryDescription salesdeliverydescription = db.SalesDeliveryDescriptions.Find(id);
            if (salesdeliverydescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesdeliverydescription;
        }

        // PUT api/SalesDeliveryDescription/5
        public HttpResponseMessage PutSalesDeliveryDescription(long id, SalesDeliveryDescription salesdeliverydescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesdeliverydescription.SalesDeliveryDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salesdeliverydescription).State = EntityState.Modified;

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

        // POST api/SalesDeliveryDescription
        public HttpResponseMessage PostSalesDeliveryDescription(SalesDeliveryDescription salesdeliverydescription)
        {
            if (ModelState.IsValid)
            {
                //db.SalesDeliveryDescriptions.Add(salesdeliverydescription);
                db.Entry(salesdeliverydescription).State = salesdeliverydescription.SalesDeliveryDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesdeliverydescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesdeliverydescription.SalesDeliveryDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesDeliveryDescription/5
        public HttpResponseMessage DeleteSalesDeliveryDescription(long id)
        {
            SalesDeliveryDescription salesdeliverydescription = db.SalesDeliveryDescriptions.Find(id);
            if (salesdeliverydescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesDeliveryDescriptions.Remove(salesdeliverydescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesdeliverydescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}