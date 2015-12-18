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
    public class RequisitionDeliveryDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/RequisitionDeliveryDescription
        public IEnumerable<RequisitionDeliveryDescription> GetRequisitionDeliveryDescriptions(ODataQueryOptions Options)
        {
            //var requisitiondeliverydescriptions = db.RequisitionDeliveryDescriptions.Include(r => r.Product).Include(r => r.UOM);
            //return requisitiondeliverydescriptions.AsEnumerable();
            return Options.ApplyTo(db.RequisitionDeliveryDescriptions.AsQueryable().Include(p => p.Product).Include(p => p.Product.ProductCategory).Include(u => u.UOM)) as IEnumerable<RequisitionDeliveryDescription>;

        }

        // GET api/RequisitionDeliveryDescription/5
        public RequisitionDeliveryDescription GetRequisitionDeliveryDescription(long id)
        {
            RequisitionDeliveryDescription requisitiondeliverydescription = db.RequisitionDeliveryDescriptions.Find(id);
            if (requisitiondeliverydescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return requisitiondeliverydescription;
        }

        // PUT api/RequisitionDeliveryDescription/5
        public HttpResponseMessage PutRequisitionDeliveryDescription(long id, RequisitionDeliveryDescription requisitiondeliverydescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != requisitiondeliverydescription.RequisitionDeliveryDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(requisitiondeliverydescription).State = EntityState.Modified;

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

        // POST api/RequisitionDeliveryDescription
        public HttpResponseMessage PostRequisitionDeliveryDescription(RequisitionDeliveryDescription requisitiondeliverydescription)
        {
            if (ModelState.IsValid)
            {
                db.Entry(requisitiondeliverydescription).State = requisitiondeliverydescription.RequisitionDeliveryDescriptionID == 0 ? EntityState.Added : EntityState.Modified;
                //db.RequisitionDeliveryDescriptions.Add(requisitiondeliverydescription);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, requisitiondeliverydescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = requisitiondeliverydescription.RequisitionDeliveryDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/RequisitionDeliveryDescription/5
        public HttpResponseMessage DeleteRequisitionDeliveryDescription(long id)
        {
            RequisitionDeliveryDescription requisitiondeliverydescription = db.RequisitionDeliveryDescriptions.Find(id);
            if (requisitiondeliverydescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.RequisitionDeliveryDescriptions.Remove(requisitiondeliverydescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, requisitiondeliverydescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}