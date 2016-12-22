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
using BMS.Models.Payroll;
using BMS.Models;

namespace BMS.Controllers.Payroll
{
    public class PayTypesController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PayTypes
        public IEnumerable<PayType> GetPayTypes()
        {
            return db.PayTypes.AsEnumerable();
        }

        // GET api/PayTypes/5
        public PayType GetPayType(long id)
        {
            PayType paytype = db.PayTypes.Find(id);
            if (paytype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return paytype;
        }

        // PUT api/PayTypes/5
        public HttpResponseMessage PutPayType(long id, PayType paytype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != paytype.PayTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(paytype).State = EntityState.Modified;

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

        // POST api/PayTypes
        public HttpResponseMessage PostPayType(PayType paytype)
        {
            if (ModelState.IsValid)
            {
                db.PayTypes.Add(paytype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, paytype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = paytype.PayTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PayTypes/5
        public HttpResponseMessage DeletePayType(long id)
        {
            PayType paytype = db.PayTypes.Find(id);
            if (paytype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PayTypes.Remove(paytype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, paytype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}