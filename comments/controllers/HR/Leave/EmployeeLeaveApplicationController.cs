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
    public class EmployeeLeaveApplicationController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/EmployeeLeaveApplication
        public IEnumerable<EmployeeLeaveApplication> GetEmployeeLeaveApplications()
        {
            //return db.EmployeeLeaveApplications.AsEnumerable();
            return db.EmployeeLeaveApplications.AsQueryable().Include(g => g.EmployeeLeaveGroup).Include(t=>t.EmployeeLeaveType);
        }

        // GET api/EmployeeLeaveApplication/5
        public EmployeeLeaveApplication GetEmployeeLeaveApplication(long id)
        {
            EmployeeLeaveApplication employeeleaveapplication = db.EmployeeLeaveApplications.Find(id);
            //employeeleaveapplication.EmployeeLeaveType = db.EmployeeLeaveTypes.Where(t => t.EmployeeLeaveTypeID == employeeleaveapplication.EmployeeLeaveType.EmployeeLeaveTypeID).FirstOrDefault();
           // employeeleaveapplication.EmployeeLeaveGroup = db.EmployeeLeaveGroups.Where(g => g.EmployeeLeaveGroupID == employeeleaveapplication.EmployeeLeaveGroup.EmployeeLeaveGroupID).FirstOrDefault();
            if (employeeleaveapplication == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeeleaveapplication;
        }

        // PUT api/EmployeeLeaveApplication/5
        public HttpResponseMessage PutEmployeeLeaveApplication(long id, EmployeeLeaveApplication employeeleaveapplication)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeeleaveapplication.EmployeeLeaveApplicationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            employeeleaveapplication.UpdateBy = loginUser.UserID;

            db.Entry(employeeleaveapplication).State = EntityState.Modified;

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

        // POST api/EmployeeLeaveApplication
        public HttpResponseMessage PostEmployeeLeaveApplication(EmployeeLeaveApplication employeeleaveapplication)
        {
            if (ModelState.IsValid)
            {
                employeeleaveapplication.InsertBy = loginUser.UserID;
                db.EmployeeLeaveApplications.Add(employeeleaveapplication);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeeleaveapplication);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeeleaveapplication.EmployeeLeaveApplicationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeLeaveApplication/5
        public HttpResponseMessage DeleteEmployeeLeaveApplication(long id)
        {
            EmployeeLeaveApplication employeeleaveapplication = db.EmployeeLeaveApplications.Find(id);
            if (employeeleaveapplication == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeeLeaveApplications.Remove(employeeleaveapplication);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeeleaveapplication);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}