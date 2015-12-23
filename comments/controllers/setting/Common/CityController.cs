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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Setting.Common
{
    public class CityController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/City
        public IEnumerable<City> GetCities(ODataQueryOptions Options)
        {
           // return db.Cities.Include(b=>b.Country).AsQueryable();
            return Options.ApplyTo(db.Cities.AsQueryable().Include(c=>c.Country)) as IEnumerable<City>;
        }

        // GET api/City/5
        public City GetCity(long id)
        {
            City city = db.Cities.Find(id);
            city.Country = db.Countries.Where(c => c.CountryID == city.CountryID).FirstOrDefault();
            
             
            if (city == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return city;
        }

        // PUT api/City/5
        public HttpResponseMessage PutCity(long id, City city)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != city.CityID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            city.Country = null;
            db.Entry(city).State = EntityState.Modified;

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

        // POST api/City
        public HttpResponseMessage PostCity(City city)
        {
            if (ModelState.IsValid)
            {
                city.InsertBy = loginUser.UserID;
                db.Cities.Add(city);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, city);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = city.CityID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/City/5
        public HttpResponseMessage DeleteCity(long id)
        {
            City city = db.Cities.Find(id);
            if (city == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Cities.Remove(city);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, city);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}