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
    public class PurchasePermitController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchasePermit
        public IEnumerable<PurchasePermit> GetPurchasePermits(ODataQueryOptions Options)
        {
            var purchasepermits = Options.ApplyTo(db.PurchasePermits.Include(p => p.Collaborator).Include(p => p.ProcesStatus));
            return purchasepermits as IEnumerable<PurchasePermit>;
        }

        // GET api/PurchasePermit/5
        public PurchasePermit GetPurchasePermit(long id)
        {
            PurchasePermit purchasepermit = db.PurchasePermits.Find(id);
            if (purchasepermit == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasepermit;
        }

        // PUT api/PurchasePermit/5
        public HttpResponseMessage PutPurchasePermit(long id, PurchasePermit purchasepermit)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasepermit.PurchasePermitID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            purchasepermit.Collaborator = null;
            purchasepermit.ProcesStatus = null;
            purchasepermit.UpdateBy = loginUser.UserID;

            db.Entry(purchasepermit).State = EntityState.Modified;

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

        // POST api/PurchasePermit
        public HttpResponseMessage PostPurchasePermit(PurchasePermit purchasepermit)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "PP-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.PurchasePermits.Where(r => r.PurchasePermitCode.StartsWith(CustomCode)).Select(r => r.PurchasePermitCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string PPCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                purchasepermit.PurchasePermitCode = PPCode;
                purchasepermit.InsertBy = loginUser.UserID;

                db.PurchasePermits.Add(purchasepermit);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasepermit);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasepermit.PurchasePermitID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchasePermit/5
        public HttpResponseMessage DeletePurchasePermit(long id)
        {
            PurchasePermit purchasepermit = db.PurchasePermits.Find(id);
            if (purchasepermit == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchasePermits.Remove(purchasepermit);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasepermit);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}