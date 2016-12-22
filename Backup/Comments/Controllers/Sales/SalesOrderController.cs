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
using BMS.Models.HR;
using BMS.Models.Accounting.Configuration.Periods;
using System.Data.Objects;

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
            if (salesorder.SalesOrderCode ==null)
            {
                FiscalYear fiscalYear = db.FiscalYears.Where(f => (EntityFunctions.TruncateTime(f.StartDate) <= DateTime.Now) && (EntityFunctions.TruncateTime(f.EndDate) >= DateTime.Now)).SingleOrDefault();
                SalesOrderCategory salesOrderCategory = db.SalesOrderCategories.Where(so => so.SalesOrderCategoryID == salesorder.SalesOrderCategoryID).SingleOrDefault();
                Collaborator custormer = db.Collaborators.Where(c => c.CollaboratorID == salesorder.CustomerID).Include(c => c.CustomerType).SingleOrDefault();

                string CustomCode = salesOrderCategory.SalesOrderCategoryCode + "/" + custormer.CustomerType.CustomerTypeID.ToString().PadLeft(3, '0') + "/" + fiscalYear.FiscalYearName + "/" + custormer.CollaboratorCode + "-";
                //string CustomCode = "SO-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.SalesOrders.Where(r => r.SalesOrderCode.StartsWith(CustomCode)).Select(r => r.SalesOrderCode.Substring(CustomCode.Length, 8)).ToList()).Max());
                string SOCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(8, '0');
                salesorder.SalesOrderCode = SOCode;
            }

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
                if(salesorder.SalesOrderCategoryID>0)
                {
                    FiscalYear fiscalYear = db.FiscalYears.Where(f => (EntityFunctions.TruncateTime(f.StartDate) <= DateTime.Now) && (EntityFunctions.TruncateTime(f.EndDate) >= DateTime.Now)).SingleOrDefault();
                    SalesOrderCategory salesOrderCategory = db.SalesOrderCategories.Where(so => so.SalesOrderCategoryID == salesorder.SalesOrderCategoryID).SingleOrDefault();
                    Collaborator custormer = db.Collaborators.Where(c => c.CollaboratorID == salesorder.CustomerID).Include(c => c.CustomerType).SingleOrDefault();

                    string CustomCode = salesOrderCategory.SalesOrderCategoryCode + "/" + custormer.CustomerType.CustomerTypeID.ToString().PadLeft(3, '0') + "/" + fiscalYear.FiscalYearName + "/" + custormer.CollaboratorCode + "-";
                    //string CustomCode = "SO-" + DateTime.Now.ToString("yyyyMMdd");

                    int? MaxCode = Convert.ToInt32((db.SalesOrders.Where(r => r.SalesOrderCode.StartsWith(CustomCode)).Select(r => r.SalesOrderCode.Substring(CustomCode.Length, 8)).ToList()).Max());
                    string SOCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(8, '0');
                    salesorder.SalesOrderCode = SOCode;
                }
                
                salesorder.Date = DateTime.Now.ToLocalTime();
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