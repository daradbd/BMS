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
using WebMatrix.WebData;

namespace BMS.Controllers.Sales
{
    public class SalesQuotationController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesQuotation
        public IEnumerable<SalesQuotation> GetSalesQuotations()
        {
            var salesquotations = db.SalesQuotations.Include(s => s.Collaborator).Include(s => s.ProcesStatus);
            return salesquotations.AsEnumerable();
        }

        // GET api/SalesQuotation/5
        public SalesQuotation GetSalesQuotation(long id)
        {
            SalesQuotation salesquotation = db.SalesQuotations.Find(id);
            if (salesquotation == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesquotation;
        }

        // PUT api/SalesQuotation/5
        public HttpResponseMessage PutSalesQuotation(long id, SalesQuotation salesquotation)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesquotation.SalesQuotationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesquotation.Collaborator = null;
            salesquotation.ProcesStatus = null;
            db.Entry(salesquotation).State = EntityState.Modified;

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

        // POST api/SalesQuotation
        public HttpResponseMessage PostSalesQuotation(SalesQuotation salesquotation)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "SQ-" + DateTime.Now.ToString("yyyyMMdd");
                int? MaxCode = Convert.ToInt32((db.SalesQuotations.Where(r => r.SalesQuotationCode.StartsWith(CustomCode)).Select(r => r.SalesQuotationCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string SQCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');

                salesquotation.SalesQuotationCode = SQCode;

                salesquotation.InsertBy = loginUser.UserID;
                db.SalesQuotations.Add(salesquotation);

                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesquotation);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesquotation.SalesQuotationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesQuotation/5
        public HttpResponseMessage DeleteSalesQuotation(long id)
        {
            SalesQuotation salesquotation = db.SalesQuotations.Find(id);
            if (salesquotation == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesQuotations.Remove(salesquotation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesquotation);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}