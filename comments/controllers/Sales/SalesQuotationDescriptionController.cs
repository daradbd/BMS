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
    public class SalesQuotationDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesQuotationDescription
        public IEnumerable<SalesQuotationDescription> GetSalesQuotationDescriptions(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.SalesQuotationDescriptions.AsQueryable().Include(s => s.Product).Include(s => s.Product.ProductCategory).Include(u=>u.UOM)) as IEnumerable<SalesQuotationDescription>;
        }

        // GET api/SalesQuotationDescription/5
        public SalesQuotationDescription GetSalesQuotationDescription(long id)
        {
            SalesQuotationDescription salesquotationdescription = db.SalesQuotationDescriptions.Find(id);
            if (salesquotationdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesquotationdescription;
        }

        // PUT api/SalesQuotationDescription/5
        public HttpResponseMessage PutSalesQuotationDescription(long id, SalesQuotationDescription salesquotationdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesquotationdescription.SalesQuotationDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesquotationdescription.UpdateBy = loginUser.UserID;
            db.Entry(salesquotationdescription).State = EntityState.Modified;

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

        // POST api/SalesQuotationDescription
        public HttpResponseMessage PostSalesQuotationDescription(SalesQuotationDescription salesquotationdescription)
        {
            if (ModelState.IsValid)
            {
                salesquotationdescription.InsertBy = loginUser.UserID;
                db.Entry(salesquotationdescription).State = salesquotationdescription.SalesQuotationDescriptionID == 0 ? EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesquotationdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesquotationdescription.SalesQuotationDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesQuotationDescription/5
        public HttpResponseMessage DeleteSalesQuotationDescription(long id)
        {
            SalesQuotationDescription salesquotationdescription = db.SalesQuotationDescriptions.Find(id);
            if (salesquotationdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesQuotationDescriptions.Remove(salesquotationdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesquotationdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}