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
using BMS.Models.Setting.Common;
using BMS.Models;

namespace BMS.Controllers.Setting.Common
{
    public class CurrencyController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Currency
        public IEnumerable<Currency> GetCurrencies()
        {
            return db.Currencies.AsEnumerable();
        }

        // GET api/Currency/5
        public Currency GetCurrency(long id)
        {
            Currency currency = db.Currencies.Find(id);
            if (currency == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return currency;
        }

        // PUT api/Currency/5
        public HttpResponseMessage PutCurrency(long id, Currency currency)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != currency.CurrencyID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            currency.UpdateBy = loginUser.UserID;
            db.Entry(currency).State = EntityState.Modified;

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

        // POST api/Currency
        public HttpResponseMessage PostCurrency(Currency currency)
        {
            if (ModelState.IsValid)
            {
                currency.InsertBy = loginUser.UserID;
                db.Currencies.Add(currency);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, currency);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = currency.CurrencyID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Currency/5
        public HttpResponseMessage DeleteCurrency(long id)
        {
            Currency currency = db.Currencies.Find(id);
            if (currency == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Currencies.Remove(currency);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, currency);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}