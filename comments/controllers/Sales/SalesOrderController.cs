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
using BMS.Models.Production;
using BMS.Models;

namespace BMS.Controllers.Sales
{
    public class SalesOrderController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesOrder
        public IEnumerable<SalesOrder> GetSalesOrders()
        {
            return db.SalesOrders.Include(r => r.Collaborator).Include(r => r.ProcesStatus).AsEnumerable();
        }

        // GET api/SalesOrder/5
        public SalesOrder GetSalesOrder(long id)
        {
            SalesOrder salesorder = db.SalesOrders.Find(id);
            if (salesorder == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesorder;
        }

        // PUT api/SalesOrder/5
        public HttpResponseMessage PutSalesOrder(long id, SalesOrder salesorder)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesorder.SalesOrderID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            salesorder.Collaborator = null;
            salesorder.ProcesStatus = null;

            db.Entry(salesorder).State = EntityState.Modified;

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

        // POST api/SalesOrder
        public HttpResponseMessage PostSalesOrder(SalesOrder salesorder)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "SO-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.SalesOrders.Where(r => r.SalesOrderCode.StartsWith(CustomCode)).Select(r => r.SalesOrderCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string SOCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                salesorder.SalesOrderCode = SOCode;
                salesorder.Date = DateTime.Now.ToLocalTime();
                salesorder.InsertBy = loginUser.UserID;
                db.SalesOrders.Add(salesorder);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesorder);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesorder.SalesOrderID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesOrder/5
        public HttpResponseMessage DeleteSalesOrder(long id)
        {
            SalesOrder salesorder = db.SalesOrders.Find(id);
            if (salesorder == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesOrders.Remove(salesorder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesorder);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}