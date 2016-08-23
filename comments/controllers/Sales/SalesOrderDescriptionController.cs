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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Sales
{
    public class SalesOrderDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesOrderDescription
        public IEnumerable<SalesOrderDescription> GetSalesOrderDescriptions(ODataQueryOptions Options)
        {
           // return db.SalesOrderDescriptions.AsEnumerable();
            return Options.ApplyTo(db.SalesOrderDescriptions.AsQueryable().Include(s => s.Product).Include(s => s.Product.ProductCategory).Include(u=>u.UOM)) as IEnumerable<SalesOrderDescription>;
        }

        // GET api/SalesOrderDescription/5
        public SalesOrderDescription GetSalesOrderDescription(long id)
        {
            SalesOrderDescription salesorderdescription = db.SalesOrderDescriptions.Find(id);
            if (salesorderdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesorderdescription;
        }

        // PUT api/SalesOrderDescription/5
        public HttpResponseMessage PutSalesOrderDescription(long id, SalesOrderDescription salesorderdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesorderdescription.SalesOrderDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesorderdescription.UpdateBy = loginUser.UserID;
            db.Entry(salesorderdescription).State = EntityState.Modified;

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

        // POST api/SalesOrderDescription
        public HttpResponseMessage PostSalesOrderDescription(SalesOrderDescription salesorderdescription)
        {
            if (ModelState.IsValid)
            {
                //db.SalesOrderDescriptions.Add(salesorderdescription);
                salesorderdescription.InsertBy = loginUser.UserID;
                db.Entry(salesorderdescription).State = salesorderdescription.SalesOrderDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesorderdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesorderdescription.SalesOrderDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesOrderDescription/5
        public HttpResponseMessage DeleteSalesOrderDescription(long id)
        {
            SalesOrderDescription salesorderdescription = db.SalesOrderDescriptions.Find(id);
            if (salesorderdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesOrderDescriptions.Remove(salesorderdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesorderdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}