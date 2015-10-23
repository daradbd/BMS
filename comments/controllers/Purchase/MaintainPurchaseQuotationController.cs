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
    public class MaintainPurchaseQuotationController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/MaintainPurchaseQuotation
        public IEnumerable<MaintainPurchaseQuotation> GetMaintainPurchaseQuotations()
        {
            return db.MaintainPurchaseQuotations.Include(r => r.Collaborator).Include(r => r.ProcesStatus).Include(r => r.ProjectSetup).AsEnumerable();
        }

        // GET api/MaintainPurchaseQuotation/5
        public MaintainPurchaseQuotation GetMaintainPurchaseQuotation(long id)
        {
            MaintainPurchaseQuotation maintainpurchasequotation = db.MaintainPurchaseQuotations.Find(id);
            if (maintainpurchasequotation == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return maintainpurchasequotation;
        }

        // PUT api/MaintainPurchaseQuotation/5
        public HttpResponseMessage PutMaintainPurchaseQuotation(long id, MaintainPurchaseQuotation maintainpurchasequotation)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != maintainpurchasequotation.MaintainPurchaseQuotationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            maintainpurchasequotation.Collaborator = null;
            maintainpurchasequotation.ProcesStatus = null;
            maintainpurchasequotation.ProjectSetup = null;
            db.Entry(maintainpurchasequotation).State = EntityState.Modified;

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

        // POST api/MaintainPurchaseQuotation
        public HttpResponseMessage PostMaintainPurchaseQuotation(MaintainPurchaseQuotation maintainpurchasequotation)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "PQ-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.MaintainPurchaseQuotations.Where(r => r.MaintainPurchaseQuotationCode.StartsWith(CustomCode)).Select(r => r.MaintainPurchaseQuotationCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string QRCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                maintainpurchasequotation.MaintainPurchaseQuotationCode = QRCode;
                db.MaintainPurchaseQuotations.Add(maintainpurchasequotation);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, maintainpurchasequotation);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = maintainpurchasequotation.MaintainPurchaseQuotationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/MaintainPurchaseQuotation/5
        public HttpResponseMessage DeleteMaintainPurchaseQuotation(long id)
        {
            MaintainPurchaseQuotation maintainpurchasequotation = db.MaintainPurchaseQuotations.Find(id);
            if (maintainpurchasequotation == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.MaintainPurchaseQuotations.Remove(maintainpurchasequotation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, maintainpurchasequotation);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}