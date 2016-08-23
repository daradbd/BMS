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
using BMS.Models.HR.Holiday;
using BMS.Models;

namespace BMS.Controllers.HR.Holiday
{
    public class WeeklyHolidayController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/WeeklyHoliday
        public IEnumerable<WeeklyHoliday> GetWeeklyHolidays()
        {
            return db.WeeklyHolidays.AsEnumerable();
        }

        // GET api/WeeklyHoliday/5
        public WeeklyHoliday GetWeeklyHoliday(long id)
        {
            WeeklyHoliday weeklyholiday = db.WeeklyHolidays.Find(id);
            if (weeklyholiday == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return weeklyholiday;
        }

        // PUT api/WeeklyHoliday/5
        public HttpResponseMessage PutWeeklyHoliday(long id, WeeklyHoliday weeklyholiday)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != weeklyholiday.WeeklyHolidayID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            weeklyholiday.UpdateBy = loginUser.UserID;
            db.Entry(weeklyholiday).State = EntityState.Modified;

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

        // POST api/WeeklyHoliday
        public HttpResponseMessage PostWeeklyHoliday(WeeklyHoliday weeklyholiday)
        {
            if (ModelState.IsValid)
            {
                weeklyholiday.InsertBy = loginUser.UserID;
                db.WeeklyHolidays.Add(weeklyholiday);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, weeklyholiday);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = weeklyholiday.WeeklyHolidayID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/WeeklyHoliday/5
        public HttpResponseMessage DeleteWeeklyHoliday(long id)
        {
            WeeklyHoliday weeklyholiday = db.WeeklyHolidays.Find(id);
            if (weeklyholiday == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WeeklyHolidays.Remove(weeklyholiday);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, weeklyholiday);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}