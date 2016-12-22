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
    public class PayOrderController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PayOrder
        public IEnumerable<PayOrder> GetPayOrders()
        {
            //return db.PayOrders.AsEnumerable();
            var payOrders = db.PayOrders.Include(s => s.PayOrderCompany).Include(s => s.SalesPerson).Include(s=>s.PayOrderBank);
            return payOrders.AsEnumerable();
        }

        // GET api/PayOrder/5
        public PayOrder GetPayOrder(long id)
        {
            PayOrder payorder = db.PayOrders.Find(id);
            if (payorder == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return payorder;
        }

        // PUT api/PayOrder/5
        public HttpResponseMessage PutPayOrder(long id, PayOrder payorder)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != payorder.PayOrderID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            payorder.PayOrderBank = null;
            payorder.PayOrderCompany = null;
            payorder.SalesPerson = null;
            if (payorder.IsReturn == true) {

                payorder.ReturnAmount = payorder.Amount;
            }
            db.Entry(payorder).State = EntityState.Modified;

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

        // POST api/PayOrder
        public HttpResponseMessage PostPayOrder(PayOrder payorder)
        {
            if (ModelState.IsValid)
            {
                if (payorder.PayOrderCode == "")
                {
                    payorder.PayOrderCode = "POC-";
                }

                int? MaxCode = Convert.ToInt32((db.PayOrders.Where(r => r.PayOrderCode.StartsWith(payorder.PayOrderCode)).Select(r => r.PayOrderCode.Substring(payorder.PayOrderCode.Length, 4)).ToList()).Max());
                string CBCode = payorder.PayOrderCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                payorder.PayOrderCode = CBCode;
                payorder.IsReturn = false;
                db.PayOrders.Add(payorder);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, payorder);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = payorder.PayOrderID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PayOrder/5
        public HttpResponseMessage DeletePayOrder(long id)
        {
            PayOrder payorder = db.PayOrders.Find(id);
            if (payorder == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PayOrders.Remove(payorder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, payorder);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}