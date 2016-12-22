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
using BMS.Models.Inventory;

namespace BMS.Controllers.Purchase
{
    public class PurchaseDeliveryReceiveDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseDeliveryReceiveDescription
        public IEnumerable<PurchaseDeliveryReceiveDescription> GetPurchaseDeliveryReceiveDescriptions(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.PurchaseDeliveryReceiveDescriptions.AsQueryable().Include(p=>p.Product).Include(u=>u.UOM)) as IEnumerable<PurchaseDeliveryReceiveDescription>;
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

            purchasedeliveryreceivedescription.UpdateBy = loginUser.UserID;
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
                
                PurchaseOrderDescription purchaseOrderDescription = db.PurchaseOrderDescriptions.Where(r => (r.PurchaseOrderID == purchasedeliveryreceivedescription.PurchaseOrderID) && (r.ProductID == purchasedeliveryreceivedescription.ProductID)).SingleOrDefault();
                Product procuct = db.Products.Where(p => p.ProductID == purchasedeliveryreceivedescription.ProductID).SingleOrDefault();
                purchasedeliveryreceivedescription.UOM = null;
                purchasedeliveryreceivedescription.InsertBy = loginUser.UserID;
               
                db.Entry(purchasedeliveryreceivedescription).State = purchasedeliveryreceivedescription.PurchaseDeliveryReceiveDescriptionID == 0 ?
                  EntityState.Added : EntityState.Modified;
                db.SaveChanges();
                var ReceivedQuantity = (db.PurchaseDeliveryReceiveDescriptions.Where(r => (r.ProductID == purchasedeliveryreceivedescription.ProductID) && (r.PurchaseOrderID == purchasedeliveryreceivedescription.PurchaseOrderID)).Select(r => r.Quantity)).ToList().Sum();
                purchaseOrderDescription.ReceivedQuantity = ReceivedQuantity;

                db.Entry(purchaseOrderDescription).State = EntityState.Modified;
                db.SaveChanges();
                if (procuct.CurrentStock==null)
                {
                    procuct.CurrentStock = 0;
                }
                procuct.CurrentStock += purchasedeliveryreceivedescription.Quantity;
                db.Entry(procuct).State = EntityState.Modified;
                db.SaveChanges();

                var PandingReceive = (db.PurchaseOrderDescriptions.Where(r => (r.PurchaseOrderID == purchasedeliveryreceivedescription.PurchaseOrderID)).Select(r => r.Quantity)).ToList().Sum();
                var ReceivedQTY= (db.PurchaseDeliveryReceiveDescriptions.Where(r =>  (r.PurchaseOrderID == purchasedeliveryreceivedescription.PurchaseOrderID)).Select(r => r.Quantity)).ToList().Sum();

                if(PandingReceive==ReceivedQTY)
                {
                    PurchaseOrder purchaseOrder = db.PurchaseOrders.Find(purchasedeliveryreceivedescription.PurchaseOrderID);
                    purchaseOrder.IsReceived = true;
                    db.Entry(purchaseOrder).State = EntityState.Modified;
                    db.SaveChanges();

                }
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