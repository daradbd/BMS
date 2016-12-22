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
using BMS.Models.Holiday.GeneralHoliday;
using BMS.Models;

namespace BMS.Controllers.HR.Holiday
{
    public class GeneralHolidayController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/GeneralHoliday
        public IEnumerable<GeneralHoliday> GetGeneralHolidays()
        {
            return db.GeneralHolidays.AsEnumerable();
        }

        // GET api/GeneralHoliday/5
        public GeneralHoliday GetGeneralHoliday(long id)
        {
            GeneralHoliday generalholiday = db.GeneralHolidays.Find(id);
            if (generalholiday == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return generalholiday;
        }

        // PUT api/GeneralHoliday/5
        public HttpResponseMessage PutGeneralHoliday(long id, GeneralHoliday generalholiday)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != generalholiday.GeneralHolidayID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(generalholiday).State = EntityState.Modified;

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

        // POST api/GeneralHoliday
        public HttpResponseMessage PostGeneralHoliday(GeneralHoliday generalholiday)
        {
            if (ModelState.IsValid)
            {
                db.GeneralHolidays.Add(generalholiday);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, generalholiday);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = generalholiday.GeneralHolidayID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/GeneralHoliday/5
        public HttpResponseMessage DeleteGeneralHoliday(long id)
        {
            GeneralHoliday generalholiday = db.GeneralHolidays.Find(id);
            if (generalholiday == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.GeneralHolidays.Remove(generalholiday);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, generalholiday);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}