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
    public class RequisitionDeliveryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/RequisitionDelivery
        public IEnumerable<RequisitionDelivery> GetRequisitionDeliveries()
        {
            var requisitiondeliveries = db.RequisitionDeliveries.Include(r => r.Collaborator).Include(r => r.ProcesStatus).Include(r => r.ProjectSetup);
            return requisitiondeliveries.AsEnumerable();
        }

        // GET api/RequisitionDelivery/5
        public RequisitionDelivery GetRequisitionDelivery(long id)
        {
            RequisitionDelivery requisitiondelivery = db.RequisitionDeliveries.Find(id);
            if (requisitiondelivery == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return requisitiondelivery;
        }

        // PUT api/RequisitionDelivery/5
        public HttpResponseMessage PutRequisitionDelivery(long id, RequisitionDelivery requisitiondelivery)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != requisitiondelivery.RequisitionDeliveryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(requisitiondelivery).State = EntityState.Modified;

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

        // POST api/RequisitionDelivery
        public HttpResponseMessage PostRequisitionDelivery(RequisitionDelivery requisitiondelivery)
        {
            if (ModelState.IsValid)
            {
                requisitiondelivery.InsertBy = loginUser.UserID;
                db.RequisitionDeliveries.Add(requisitiondelivery);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, requisitiondelivery);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = requisitiondelivery.RequisitionDeliveryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/RequisitionDelivery/5
        public HttpResponseMessage DeleteRequisitionDelivery(long id)
        {
            RequisitionDelivery requisitiondelivery = db.RequisitionDeliveries.Find(id);
            if (requisitiondelivery == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.RequisitionDeliveries.Remove(requisitiondelivery);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, requisitiondelivery);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}