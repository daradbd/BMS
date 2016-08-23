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
    public class CountryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Country
        public IQueryable<Country> GetCountries()
        {
            return db.Countries;
        }

        // GET api/Country/5
        public Country GetCountry(long id)
        {
            Country country = db.Countries.Find(id);
            if (country == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return country;
        }

        // PUT api/Country/5
        public HttpResponseMessage PutCountry(long id, Country country)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != country.CountryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            country.UpdateBy= loginUser.UserID;
            db.Entry(country).State = EntityState.Modified;

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

        // POST api/Country
        public HttpResponseMessage PostCountry(Country country)
        {
            if (ModelState.IsValid)
            {
                country.InsertBy = loginUser.UserID;
                db.Countries.Add(country);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, country);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = country.CountryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Country/5
        public HttpResponseMessage DeleteCountry(long id)
        {
            Country country = db.Countries.Find(id);
            if (country == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Countries.Remove(country);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, country);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}