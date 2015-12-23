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


namespace BMS.Controllers.Production
{
    public class ProductionOrderController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductionOrder
        public IEnumerable<ProductionOrder> GetProductionOrders()
        {
            return db.ProductionOrders.AsEnumerable();
        }

        // GET api/ProductionOrder/5
        public ProductionOrder GetProductionOrder(long id)
        {
            ProductionOrder productionorder = db.ProductionOrders.Find(id);
            if (productionorder == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productionorder;
        }

        // PUT api/ProductionOrder/5
        public HttpResponseMessage PutProductionOrder(long id, ProductionOrder productionorder)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productionorder.ProductionOrderID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(productionorder).State = EntityState.Modified;

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

        // POST api/ProductionOrder
        public HttpResponseMessage PostProductionOrder(ProductionOrder productionorder)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "ProO-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.ProductionOrders.Where(r => r.ProductionOrderCode.StartsWith(CustomCode)).Select(r => r.ProductionOrderCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string ProOCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                productionorder.ProductionOrderCode = ProOCode;
                productionorder.Date = DateTime.Now.ToLocalTime();
                productionorder.InsertBy = loginUser.UserID;
                db.ProductionOrders.Add(productionorder);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productionorder);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productionorder.ProductionOrderID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductionOrder/5
        public HttpResponseMessage DeleteProductionOrder(long id)
        {
            ProductionOrder productionorder = db.ProductionOrders.Find(id);
            if (productionorder == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductionOrders.Remove(productionorder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productionorder);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}