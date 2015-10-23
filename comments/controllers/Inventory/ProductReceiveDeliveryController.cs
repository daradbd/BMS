
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
    public class ProductReceiveDeliveryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ProductReceiveDelivery
        public IEnumerable<ProductReceiveDelivery> GetProductReceiveDeliveries()
        {
            var productreceivedeliveries = db.ProductReceiveDeliveries.Include(p => p.Collaborator).Include(p => p.ProcesStatus);
            return productreceivedeliveries.AsEnumerable();
        }

        // GET api/ProductReceiveDelivery/5
        public ProductReceiveDelivery GetProductReceiveDelivery(long id)
        {
            ProductReceiveDelivery productreceivedelivery = db.ProductReceiveDeliveries.Find(id);
            if (productreceivedelivery == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productreceivedelivery;
        }

        // PUT api/ProductReceiveDelivery/5
        public HttpResponseMessage PutProductReceiveDelivery(long id, ProductReceiveDelivery productreceivedelivery)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productreceivedelivery.ProductReceiveDeliveryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productreceivedelivery).State = EntityState.Modified;

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

        // POST api/ProductReceiveDelivery
        public HttpResponseMessage PostProductReceiveDelivery(ProductReceiveDelivery productreceivedelivery)
        {
            if (ModelState.IsValid)
            {
                db.ProductReceiveDeliveries.Add(productreceivedelivery);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productreceivedelivery);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productreceivedelivery.ProductReceiveDeliveryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductReceiveDelivery/5
        public HttpResponseMessage DeleteProductReceiveDelivery(long id)
        {
            ProductReceiveDelivery productreceivedelivery = db.ProductReceiveDeliveries.Find(id);
            if (productreceivedelivery == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductReceiveDeliveries.Remove(productreceivedelivery);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productreceivedelivery);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}