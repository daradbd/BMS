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
using BMS.Models.Inventory;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Purchase
{
    public class PurchaseRequisitionDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseRequisitionDescription
        public IEnumerable<PurchaseRequisitionDescription> GetPurchaseRequisitionDescriptions(ODataQueryOptions Options)
        {
            //return db.PurchaseRequisitionDescriptions.Include(p=>p.Product).AsEnumerable();
            //return Options.ApplyTo(db.PurchaseRequisitionDescriptions.Include(p => p.Product) as IQueryable) as IEnumerable<PurchaseRequisitionDescription>;

            //db.PurchaseRequisitionDescriptions.Include(p => p.Product).Include()

            return Options.ApplyTo(db.PurchaseRequisitionDescriptions.AsQueryable().Include(p => p.Product).Include(p => p.Product.ProductCategory).Include(u => u.UOM)) as IEnumerable<PurchaseRequisitionDescription>;
        }

        // GET api/PurchaseRequisitionDescription/5
        public PurchaseRequisitionDescription GetPurchaseRequisitionDescription(long id)
        {
            PurchaseRequisitionDescription purchaserequisitiondescription = db.PurchaseRequisitionDescriptions.Find(id);
            if (purchaserequisitiondescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchaserequisitiondescription;
        }

        // PUT api/PurchaseRequisitionDescription/5
        public HttpResponseMessage PutPurchaseRequisitionDescription(long id, PurchaseRequisitionDescription purchaserequisitiondescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchaserequisitiondescription.PurchaseRequisitionDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            purchaserequisitiondescription.UpdateBy = loginUser.UserID;

            db.Entry(purchaserequisitiondescription).State = EntityState.Modified;

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

        // POST api/PurchaseRequisitionDescription
        public HttpResponseMessage PostPurchaseRequisitionDescription(PurchaseRequisitionDescription purchaserequisitiondescription)
        {
            if (ModelState.IsValid)
            {
                purchaserequisitiondescription.InsertBy = loginUser.UserID;
                db.Entry(purchaserequisitiondescription).State = purchaserequisitiondescription.PurchaseRequisitionDescriptionID == 0 ? EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchaserequisitiondescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchaserequisitiondescription.PurchaseRequisitionDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseRequisitionDescription/5
        public HttpResponseMessage DeletePurchaseRequisitionDescription(long id)
        {
            PurchaseRequisitionDescription purchaserequisitiondescription = db.PurchaseRequisitionDescriptions.Find(id);
            if (purchaserequisitiondescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseRequisitionDescriptions.Remove(purchaserequisitiondescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchaserequisitiondescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}