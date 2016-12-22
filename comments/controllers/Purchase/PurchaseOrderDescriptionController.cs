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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Purchase
{
    public class PurchaseOrderDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseOrderDescription
        public IEnumerable<PurchaseOrderDescription> GetPurchaseOrderDescriptions(ODataQueryOptions Options)
        {
            //return db.PurchaseOrderDescriptions.AsEnumerable();
            return Options.ApplyTo(db.PurchaseOrderDescriptions.AsQueryable().Include(p => p.Product).Include(p => p.Product.ProductCategory)) as IEnumerable<PurchaseOrderDescription>;
        }

        // GET api/PurchaseOrderDescription/5
        public PurchaseOrderDescription GetPurchaseOrderDescription(long id)
        {
            PurchaseOrderDescription purchaseorderdescription = db.PurchaseOrderDescriptions.Find(id);
            if (purchaseorderdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchaseorderdescription;
        }

        // PUT api/PurchaseOrderDescription/5
        public HttpResponseMessage PutPurchaseOrderDescription(long id, PurchaseOrderDescription purchaseorderdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchaseorderdescription.PurchaseOrderDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            purchaseorderdescription.UpdateBy = loginUser.UserID;

            db.Entry(purchaseorderdescription).State = EntityState.Modified;

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

        // POST api/PurchaseOrderDescription
        public HttpResponseMessage PostPurchaseOrderDescription(PurchaseOrderDescription purchaseorderdescription)
        {
            if (ModelState.IsValid)
            {
                //db.PurchaseOrderDescriptions.Add(purchaseorderdescription);
                purchaseorderdescription.InsertBy = loginUser.UserID;
                db.Entry(purchaseorderdescription).State = purchaseorderdescription.PurchaseOrderDescriptionID == 0 ?
                   EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchaseorderdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchaseorderdescription.PurchaseOrderDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseOrderDescription/5
        public HttpResponseMessage DeletePurchaseOrderDescription(long id)
        {
            PurchaseOrderDescription purchaseorderdescription = db.PurchaseOrderDescriptions.Find(id);
            if (purchaseorderdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseOrderDescriptions.Remove(purchaseorderdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchaseorderdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}