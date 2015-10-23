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
using BMS.Models.HR.Leave;
using BMS.Models;

namespace BMS.Controllers.HR.Leave
{
    public class EmployeeLeaveTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/EmployeeLeaveType
        public IEnumerable<EmployeeLeaveType> GetEmployeeLeaveTypes()
        {
            return db.EmployeeLeaveTypes.AsEnumerable();
        }

        // GET api/EmployeeLeaveType/5
        public EmployeeLeaveType GetEmployeeLeaveType(long id)
        {
            EmployeeLeaveType employeeleavetype = db.EmployeeLeaveTypes.Find(id);
            if (employeeleavetype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeeleavetype;
        }

        // PUT api/EmployeeLeaveType/5
        public HttpResponseMessage PutEmployeeLeaveType(long id, EmployeeLeaveType employeeleavetype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeeleavetype.EmployeeLeaveTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(employeeleavetype).State = EntityState.Modified;

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

        // POST api/EmployeeLeaveType
        public HttpResponseMessage PostEmployeeLeaveType(EmployeeLeaveType employeeleavetype)
        {
            if (ModelState.IsValid)
            {
                db.EmployeeLeaveTypes.Add(employeeleavetype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeeleavetype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeeleavetype.EmployeeLeaveTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeLeaveType/5
        public HttpResponseMessage DeleteEmployeeLeaveType(long id)
        {
            EmployeeLeaveType employeeleavetype = db.EmployeeLeaveTypes.Find(id);
            if (employeeleavetype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeeLeaveTypes.Remove(employeeleavetype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeeleavetype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}