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
using BMS.Models.HR;
using BMS.Models;

namespace BMS.Controllers.HR
{
    public class EmployeeTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/EmployeeType
        public IEnumerable<EmployeeType> GetEmployeeTypes()
        {
            return db.EmployeeTypes.AsEnumerable();
        }

        // GET api/EmployeeType/5
        public EmployeeType GetEmployeeType(long id)
        {
            EmployeeType employeetype = db.EmployeeTypes.Find(id);
            if (employeetype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeetype;
        }

        // PUT api/EmployeeType/5
        public HttpResponseMessage PutEmployeeType(long id, EmployeeType employeetype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeetype.EmployeeTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(employeetype).State = EntityState.Modified;

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

        // POST api/EmployeeType
        public HttpResponseMessage PostEmployeeType(EmployeeType employeetype)
        {
            if (ModelState.IsValid)
            {
                employeetype.InsertBy = loginUser.UserID;
                db.EmployeeTypes.Add(employeetype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeetype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeetype.EmployeeTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeType/5
        public HttpResponseMessage DeleteEmployeeType(long id)
        {
            EmployeeType employeetype = db.EmployeeTypes.Find(id);
            if (employeetype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeeTypes.Remove(employeetype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeetype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}