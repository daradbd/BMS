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
    public class RequestForQuotationController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/RequestForQuotation
        public IEnumerable<RequestForQuotation> GetRequestForQuotations()
        {
            return db.RequestForQuotations.Include(r => r.Collaborator).Include(r => r.ProcesStatus).Include(r => r.ProjectSetup).AsEnumerable();
        }

        // GET api/RequestForQuotation/5
        public RequestForQuotation GetRequestForQuotation(long id)
        {
            RequestForQuotation requestforquotation = db.RequestForQuotations.Find(id);
            if (requestforquotation == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return requestforquotation;
        }

        // PUT api/RequestForQuotation/5
        public HttpResponseMessage PutRequestForQuotation(long id, RequestForQuotation requestforquotation)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != requestforquotation.RequestForQuotationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            requestforquotation.ProcesStatus = null;
            requestforquotation.Collaborator = null;
            db.Entry(requestforquotation).State = EntityState.Modified;

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

        // POST api/RequestForQuotation
        public HttpResponseMessage PostRequestForQuotation(RequestForQuotation requestforquotation)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "ARQ-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.RequestForQuotations.Where(r => r.RequestForQuotationCode.StartsWith(CustomCode)).Select(r => r.RequestForQuotationCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string QRCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                requestforquotation.RequestForQuotationCode = QRCode;
                requestforquotation.InsertBy = loginUser.UserID;

                db.RequestForQuotations.Add(requestforquotation);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, requestforquotation);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = requestforquotation.RequestForQuotationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/RequestForQuotation/5
        public HttpResponseMessage DeleteRequestForQuotation(long id)
        {
            RequestForQuotation requestforquotation = db.RequestForQuotations.Find(id);
            if (requestforquotation == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.RequestForQuotations.Remove(requestforquotation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, requestforquotation);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}