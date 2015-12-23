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
    public class EmployeeLeaveGroupController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/EmployeeLeaveGroup
        public IEnumerable<EmployeeLeaveGroup> GetEmployeeLeaveGroups()
        {
            return db.EmployeeLeaveGroups.AsEnumerable();
        }

        // GET api/EmployeeLeaveGroup/5
        public EmployeeLeaveGroup GetEmployeeLeaveGroup(long id)
        {
            EmployeeLeaveGroup employeeleavegroup = db.EmployeeLeaveGroups.Find(id);
            if (employeeleavegroup == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeeleavegroup;
        }

        // PUT api/EmployeeLeaveGroup/5
        public HttpResponseMessage PutEmployeeLeaveGroup(long id, EmployeeLeaveGroup employeeleavegroup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeeleavegroup.EmployeeLeaveGroupID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(employeeleavegroup).State = EntityState.Modified;

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

        // POST api/EmployeeLeaveGroup
        public HttpResponseMessage PostEmployeeLeaveGroup(EmployeeLeaveGroup employeeleavegroup)
        {
            if (ModelState.IsValid)
            {
                employeeleavegroup.InsertBy = loginUser.UserID;
                db.EmployeeLeaveGroups.Add(employeeleavegroup);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeeleavegroup);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeeleavegroup.EmployeeLeaveGroupID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeLeaveGroup/5
        public HttpResponseMessage DeleteEmployeeLeaveGroup(long id)
        {
            EmployeeLeaveGroup employeeleavegroup = db.EmployeeLeaveGroups.Find(id);
            if (employeeleavegroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeeLeaveGroups.Remove(employeeleavegroup);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeeleavegroup);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}