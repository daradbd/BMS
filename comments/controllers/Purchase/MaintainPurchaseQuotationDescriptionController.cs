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
    public class MaintainPurchaseQuotationDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/MaintainPurchaseQuotationDescription
        public IEnumerable<MaintainPurchaseQuotationDescription> GetMaintainPurchaseQuotationDescriptions(ODataQueryOptions Options)
        {
            // return db.MaintainPurchaseQuotationDescriptions.AsEnumerable();
            return Options.ApplyTo(db.MaintainPurchaseQuotationDescriptions.AsQueryable().Include(p => p.Product).Include(p => p.Product.ProductCategory)) as IEnumerable<MaintainPurchaseQuotationDescription>;
        }

        // GET api/MaintainPurchaseQuotationDescription/5
        public MaintainPurchaseQuotationDescription GetMaintainPurchaseQuotationDescription(long id)
        {
            MaintainPurchaseQuotationDescription maintainpurchasequotationdescription = db.MaintainPurchaseQuotationDescriptions.Find(id);
            if (maintainpurchasequotationdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return maintainpurchasequotationdescription;
        }

        // PUT api/MaintainPurchaseQuotationDescription/5
        public HttpResponseMessage PutMaintainPurchaseQuotationDescription(long id, MaintainPurchaseQuotationDescription maintainpurchasequotationdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != maintainpurchasequotationdescription.MaintainPurchaseQuotationDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(maintainpurchasequotationdescription).State = EntityState.Modified;

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

        // POST api/MaintainPurchaseQuotationDescription
        public HttpResponseMessage PostMaintainPurchaseQuotationDescription(MaintainPurchaseQuotationDescription maintainpurchasequotationdescription)
        {
            if (ModelState.IsValid)
            {
               // db.MaintainPurchaseQuotationDescriptions.Add(maintainpurchasequotationdescription);
                db.Entry(maintainpurchasequotationdescription).State = maintainpurchasequotationdescription.MaintainPurchaseQuotationDescriptionID == 0 ?
                    EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, maintainpurchasequotationdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = maintainpurchasequotationdescription.MaintainPurchaseQuotationDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/MaintainPurchaseQuotationDescription/5
        public HttpResponseMessage DeleteMaintainPurchaseQuotationDescription(long id)
        {
            MaintainPurchaseQuotationDescription maintainpurchasequotationdescription = db.MaintainPurchaseQuotationDescriptions.Find(id);
            if (maintainpurchasequotationdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.MaintainPurchaseQuotationDescriptions.Remove(maintainpurchasequotationdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, maintainpurchasequotationdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}