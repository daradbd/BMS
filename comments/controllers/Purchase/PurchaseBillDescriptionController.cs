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
    public class PurchaseBillDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PurchaseBillDescription
        public IEnumerable<PurchaseBillDescription> GetPurchaseBillDescriptions()
        {
            var purchasebilldescriptions = db.PurchaseBillDescriptions.Include(p => p.Product);
            return purchasebilldescriptions.AsEnumerable();
        }

        // GET api/PurchaseBillDescription/5
        public PurchaseBillDescription GetPurchaseBillDescription(long id)
        {
            PurchaseBillDescription purchasebilldescription = db.PurchaseBillDescriptions.Find(id);
            if (purchasebilldescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasebilldescription;
        }

        // PUT api/PurchaseBillDescription/5
        public HttpResponseMessage PutPurchaseBillDescription(long id, PurchaseBillDescription purchasebilldescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasebilldescription.PurchaseBillDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchasebilldescription).State = EntityState.Modified;

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

        // POST api/PurchaseBillDescription
        public HttpResponseMessage PostPurchaseBillDescription(PurchaseBillDescription purchasebilldescription)
        {
            if (ModelState.IsValid)
            {
                //db.PurchaseBillDescriptions.Add(purchasebilldescription);
                db.Entry(purchasebilldescription).State = purchasebilldescription.PurchaseBillDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;

                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasebilldescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasebilldescription.PurchaseBillDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseBillDescription/5
        public HttpResponseMessage DeletePurchaseBillDescription(long id)
        {
            PurchaseBillDescription purchasebilldescription = db.PurchaseBillDescriptions.Find(id);
            if (purchasebilldescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseBillDescriptions.Remove(purchasebilldescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasebilldescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}