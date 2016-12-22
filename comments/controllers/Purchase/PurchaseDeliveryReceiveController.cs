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
    public class PurchaseDeliveryReceiveController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseDeliveryReceive
        public IEnumerable<PurchaseDeliveryReceive> GetPurchaseDeliveryReceives()
        {
            return db.PurchaseDeliveryReceives.AsEnumerable();
        }

        // GET api/PurchaseDeliveryReceive/5
        public PurchaseDeliveryReceive GetPurchaseDeliveryReceive(long id)
        {
            PurchaseDeliveryReceive purchasedeliveryreceive = db.PurchaseDeliveryReceives.Find(id);
            if (purchasedeliveryreceive == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasedeliveryreceive;
        }

        // PUT api/PurchaseDeliveryReceive/5
        public HttpResponseMessage PutPurchaseDeliveryReceive(long id, PurchaseDeliveryReceive purchasedeliveryreceive)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasedeliveryreceive.PurchaseDeliveryReceiveID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            purchasedeliveryreceive.UpdateBy = loginUser.UserID;
            db.Entry(purchasedeliveryreceive).State = EntityState.Modified;

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

        // POST api/PurchaseDeliveryReceive
        public HttpResponseMessage PostPurchaseDeliveryReceive(PurchaseDeliveryReceive purchasedeliveryreceive)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "PB-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.PurchaseDeliveryReceives.Where(r => r.PurchaseDeliveryReceiveCode.StartsWith(CustomCode)).Select(r => r.PurchaseDeliveryReceiveCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string PRCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                purchasedeliveryreceive.PurchaseDeliveryReceiveCode = PRCode;

                purchasedeliveryreceive.InsertBy = loginUser.UserID;
                db.PurchaseDeliveryReceives.Add(purchasedeliveryreceive);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasedeliveryreceive);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasedeliveryreceive.PurchaseDeliveryReceiveID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseDeliveryReceive/5
        public HttpResponseMessage DeletePurchaseDeliveryReceive(long id)
        {
            PurchaseDeliveryReceive purchasedeliveryreceive = db.PurchaseDeliveryReceives.Find(id);
            if (purchasedeliveryreceive == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseDeliveryReceives.Remove(purchasedeliveryreceive);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasedeliveryreceive);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}