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

namespace BMS.Controllers.Sales
{
    public class SalesDeliveryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalesDelivery
        public IEnumerable<SalesDelivery> GetSalesDeliveries()
        {
            var salesdeliveries = db.SalesDeliveries.Include(s => s.Collaborator).Include(s => s.ProcesStatus);
            return salesdeliveries.AsEnumerable();
        }

        // GET api/SalesDelivery/5
        public SalesDelivery GetSalesDelivery(long id)
        {
            SalesDelivery salesdelivery = db.SalesDeliveries.Find(id);
            if (salesdelivery == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesdelivery;
        }

        // PUT api/SalesDelivery/5
        public HttpResponseMessage PutSalesDelivery(long id, SalesDelivery salesdelivery)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesdelivery.SalesDeliveryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salesdelivery).State = EntityState.Modified;

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

        // POST api/SalesDelivery
        public HttpResponseMessage PostSalesDelivery(SalesDelivery salesdelivery)
        {
            if (ModelState.IsValid)
            {
                db.SalesDeliveries.Add(salesdelivery);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesdelivery);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesdelivery.SalesDeliveryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesDelivery/5
        public HttpResponseMessage DeleteSalesDelivery(long id)
        {
            SalesDelivery salesdelivery = db.SalesDeliveries.Find(id);
            if (salesdelivery == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesDeliveries.Remove(salesdelivery);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesdelivery);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}