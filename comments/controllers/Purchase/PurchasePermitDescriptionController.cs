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
    public class PurchasePermitDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchasePermitDescription
        public IEnumerable<PurchasePermitDescription> GetPurchasePermitDescriptions(ODataQueryOptions Options)
        {
            var purchasepermitdescriptions = Options.ApplyTo(db.PurchasePermitDescriptions.Include(p => p.Product).Include(p => p.UOM));
            return purchasepermitdescriptions as IEnumerable<PurchasePermitDescription>;
        }

        // GET api/PurchasePermitDescription/5
        public PurchasePermitDescription GetPurchasePermitDescription(long id)
        {
            PurchasePermitDescription purchasepermitdescription = db.PurchasePermitDescriptions.Find(id);
            if (purchasepermitdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasepermitdescription;
        }

        // PUT api/PurchasePermitDescription/5
        public HttpResponseMessage PutPurchasePermitDescription(long id, PurchasePermitDescription purchasepermitdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasepermitdescription.PurchasePermitDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(purchasepermitdescription).State = EntityState.Modified;

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

        // POST api/PurchasePermitDescription
        public HttpResponseMessage PostPurchasePermitDescription(PurchasePermitDescription purchasepermitdescription)
        {
            if (ModelState.IsValid)
            {
                PurchaseOrder purchaseorder = db.PurchaseOrders.Find(purchasepermitdescription.PurchaseOrderID);
                db.PurchasePermitDescriptions.Add(purchasepermitdescription);
               

                purchaseorder.IsPermited = true;
                db.Entry(purchaseorder).State = EntityState.Modified;

                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasepermitdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasepermitdescription.PurchasePermitDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchasePermitDescription/5
        public HttpResponseMessage DeletePurchasePermitDescription(long id)
        {
            PurchasePermitDescription purchasepermitdescription = db.PurchasePermitDescriptions.Find(id);
            if (purchasepermitdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchasePermitDescriptions.Remove(purchasepermitdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasepermitdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}