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
    public class RequestForQuotationDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/RequestForQuotationDescription
        public IEnumerable<RequestForQuotationDescription> GetRequestForQuotationDescriptions(ODataQueryOptions Options)
        {
           // return db.RequestForQuotationDescriptions.AsEnumerable();
            return Options.ApplyTo(db.RequestForQuotationDescriptions.AsQueryable().Include(p => p.Product).Include(p => p.Product.ProductCategory)) as IEnumerable<RequestForQuotationDescription>;
        }

        // GET api/RequestForQuotationDescription/5
        public RequestForQuotationDescription GetRequestForQuotationDescription(long id)
        {
            RequestForQuotationDescription requestforquotationdescription = db.RequestForQuotationDescriptions.Find(id);
            if (requestforquotationdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return requestforquotationdescription;
        }

        // PUT api/RequestForQuotationDescription/5
        public HttpResponseMessage PutRequestForQuotationDescription(long id, RequestForQuotationDescription requestforquotationdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != requestforquotationdescription.RequestForQuotationDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            requestforquotationdescription.UpdateBy = loginUser.UserID;

            db.Entry(requestforquotationdescription).State = EntityState.Modified;

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

        // POST api/RequestForQuotationDescription
        public HttpResponseMessage PostRequestForQuotationDescription(RequestForQuotationDescription requestforquotationdescription)
        {
            if (ModelState.IsValid)
            {
                requestforquotationdescription.InsertBy = loginUser.UserID;
                db.RequestForQuotationDescriptions.Add(requestforquotationdescription);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, requestforquotationdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = requestforquotationdescription.RequestForQuotationDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/RequestForQuotationDescription/5
        public HttpResponseMessage DeleteRequestForQuotationDescription(long id)
        {
            RequestForQuotationDescription requestforquotationdescription = db.RequestForQuotationDescriptions.Find(id);
            if (requestforquotationdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.RequestForQuotationDescriptions.Remove(requestforquotationdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, requestforquotationdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}