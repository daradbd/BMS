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
    public class PurchaseOrderCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PurchaseOrderCategory
        public IEnumerable<PurchaseOrderCategory> GetPurchaseOrderCategories()
        {
            return db.PurchaseOrderCategories.AsEnumerable();
        }

        // GET api/PurchaseOrderCategory/5
        public PurchaseOrderCategory GetPurchaseOrderCategory(long id)
        {
            PurchaseOrderCategory purchaseordercategory = db.PurchaseOrderCategories.Find(id);
            if (purchaseordercategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchaseordercategory;
        }

        // PUT api/PurchaseOrderCategory/5
        public HttpResponseMessage PutPurchaseOrderCategory(long id, PurchaseOrderCategory purchaseordercategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchaseordercategory.PurchaseOrderCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchaseordercategory).State = EntityState.Modified;

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

        // POST api/PurchaseOrderCategory
        public HttpResponseMessage PostPurchaseOrderCategory(PurchaseOrderCategory purchaseordercategory)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseOrderCategories.Add(purchaseordercategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchaseordercategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchaseordercategory.PurchaseOrderCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseOrderCategory/5
        public HttpResponseMessage DeletePurchaseOrderCategory(long id)
        {
            PurchaseOrderCategory purchaseordercategory = db.PurchaseOrderCategories.Find(id);
            if (purchaseordercategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseOrderCategories.Remove(purchaseordercategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchaseordercategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}