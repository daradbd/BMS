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
    public class HolidayTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/HolidayType
        public IEnumerable<HolidayType> GetHolidayTypes()
        {
            return db.HolidayTypes.AsEnumerable();
        }

        // GET api/HolidayType/5
        public HolidayType GetHolidayType(long id)
        {
            HolidayType holidaytype = db.HolidayTypes.Find(id);
            if (holidaytype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return holidaytype;
        }

        // PUT api/HolidayType/5
        public HttpResponseMessage PutHolidayType(long id, HolidayType holidaytype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != holidaytype.HolidayTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(holidaytype).State = EntityState.Modified;

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

        // POST api/HolidayType
        public HttpResponseMessage PostHolidayType(HolidayType holidaytype)
        {
            if (ModelState.IsValid)
            {
                holidaytype.InsertBy = loginUser.UserID;
                db.HolidayTypes.Add(holidaytype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, holidaytype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = holidaytype.HolidayTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/HolidayType/5
        public HttpResponseMessage DeleteHolidayType(long id)
        {
            HolidayType holidaytype = db.HolidayTypes.Find(id);
            if (holidaytype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.HolidayTypes.Remove(holidaytype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, holidaytype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}