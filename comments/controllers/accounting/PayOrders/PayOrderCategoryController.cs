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
using BMS.Models.Accounting.PayOrders;
using BMS.Models;

namespace BMS.Controllers.Accounting.PayOrders
{
    public class PayOrderCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PayOrderCategory
        public IEnumerable<PayOrderCategory> GetPayOrderCategories()
        {
            return db.PayOrderCategories.AsEnumerable();
        }

        // GET api/PayOrderCategory/5
        public PayOrderCategory GetPayOrderCategory(long id)
        {
            PayOrderCategory payordercategory = db.PayOrderCategories.Find(id);
            if (payordercategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return payordercategory;
        }

        // PUT api/PayOrderCategory/5
        public HttpResponseMessage PutPayOrderCategory(long id, PayOrderCategory payordercategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != payordercategory.PayOrderCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(payordercategory).State = EntityState.Modified;

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

        // POST api/PayOrderCategory
        public HttpResponseMessage PostPayOrderCategory(PayOrderCategory payordercategory)
        {
            if (ModelState.IsValid)
            {
                db.PayOrderCategories.Add(payordercategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, payordercategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = payordercategory.PayOrderCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PayOrderCategory/5
        public HttpResponseMessage DeletePayOrderCategory(long id)
        {
            PayOrderCategory payordercategory = db.PayOrderCategories.Find(id);
            if (payordercategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PayOrderCategories.Remove(payordercategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, payordercategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}