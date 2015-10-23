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
using BMS.Models.Purchase;
using BMS.Models;

namespace BMS.Controllers.Purchase
{
    public class PurchaseDeliveryReceiveDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PurchaseDeliveryReceiveDescription
        public IEnumerable<PurchaseDeliveryReceiveDescription> GetPurchaseDeliveryReceiveDescriptions()
        {
            return db.PurchaseDeliveryReceiveDescriptions.AsEnumerable();
        }

        // GET api/PurchaseDeliveryReceiveDescription/5
        public PurchaseDeliveryReceiveDescription GetPurchaseDeliveryReceiveDescription(long id)
        {
            PurchaseDeliveryReceiveDescription purchasedeliveryreceivedescription = db.PurchaseDeliveryReceiveDescriptions.Find(id);
            if (purchasedeliveryreceivedescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasedeliveryreceivedescription;
        }

        // PUT api/PurchaseDeliveryReceiveDescription/5
        public HttpResponseMessage PutPurchaseDeliveryReceiveDescription(long id, PurchaseDeliveryReceiveDescription purchasedeliveryreceivedescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasedeliveryreceivedescription.PurchaseDeliveryReceiveDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchasedeliveryreceivedescription).State = EntityState.Modified;

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

        // POST api/PurchaseDeliveryReceiveDescription
        public HttpResponseMessage PostPurchaseDeliveryReceiveDescription(PurchaseDeliveryReceiveDescription purchasedeliveryreceivedescription)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseDeliveryReceiveDescriptions.Add(purchasedeliveryreceivedescription);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasedeliveryreceivedescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasedeliveryreceivedescription.PurchaseDeliveryReceiveDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseDeliveryReceiveDescription/5
        public HttpResponseMessage DeletePurchaseDeliveryReceiveDescription(long id)
        {
            PurchaseDeliveryReceiveDescription purchasedeliveryreceivedescription = db.PurchaseDeliveryReceiveDescriptions.Find(id);
            if (purchasedeliveryreceivedescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseDeliveryReceiveDescriptions.Remove(purchasedeliveryreceivedescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasedeliveryreceivedescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}