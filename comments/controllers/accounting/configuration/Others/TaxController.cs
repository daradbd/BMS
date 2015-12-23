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
using BMS.Models.Accounting.Configuration.Others;
using BMS.Models;

namespace BMS.Controllers.Accounting.Configuration.Others
{
    public class TaxController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Tax
        public IEnumerable<Tax> GetTaxes()
        {
            return db.Taxes.AsEnumerable();
        }

        // GET api/Tax/5
        public Tax GetTax(long id)
        {
            Tax tax = db.Taxes.Find(id);
            if (tax == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tax;
        }

        // PUT api/Tax/5
        public HttpResponseMessage PutTax(long id, Tax tax)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != tax.TaxID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(tax).State = EntityState.Modified;

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

        // POST api/Tax
        public HttpResponseMessage PostTax(Tax tax)
        {
            if (ModelState.IsValid)
            {
                tax.InsertBy = loginUser.UserID;
                db.Taxes.Add(tax);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tax);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tax.TaxID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Tax/5
        public HttpResponseMessage DeleteTax(long id)
        {
            Tax tax = db.Taxes.Find(id);
            if (tax == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Taxes.Remove(tax);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tax);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}