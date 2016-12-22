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
using BMS.Models.Payroll;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Payroll
{
    public class AttendanceAuditController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/AttendanceAudit
        public HttpResponseMessage GetAttendanceAudits( string MonthYear)
        {
            //IEnumerable<AttendanceAudit> AA = Options.ApplyTo(db.AttendanceAudits.AsQueryable()) as IEnumerable<AttendanceAudit>;
            var result = db.Collaborators.Where(e => e.IsEmployee == true)
                       .GroupJoin(db.AttendanceAudits.Where(a => a.MonthYear == MonthYear), 
                                  n => n.CollaboratorID,
                                  m => m.EmployeeID,
                                  (n, ms) => new { n, ms = ms.DefaultIfEmpty() })
                       .SelectMany(z => z.ms.Select(m => new {
                           Employee=z.n,
                           EmployeeID=z.n.CollaboratorID,
                           AttendanceAuditID=m.AttendanceAuditID==null?0:m.AttendanceAuditID,
                           DaysWorked = m.DaysWorked==null?0:m.DaysWorked,
                           EarnedLeave = m.EarnedLeave==null?0:m.EarnedLeave,
                           CasualLeave = m.CasualLeave==null?0:m.CasualLeave,
                           LateAttendance = m.LateAttendance==null?0:m.LateAttendance,
                           OverTime=m.OverTime==null?0:m.OverTime
                           
                       }));

            //return db.AttendanceAudits.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/AttendanceAudit/5
        public AttendanceAudit GetAttendanceAudit(long id)
        {
            AttendanceAudit attendanceaudit = db.AttendanceAudits.Find(id);
            if (attendanceaudit == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return attendanceaudit;
        }

        // PUT api/AttendanceAudit/5
        public HttpResponseMessage PutAttendanceAudit(long id, AttendanceAudit attendanceaudit)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != attendanceaudit.AttendanceAuditID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(attendanceaudit).State = EntityState.Modified;

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

        // POST api/AttendanceAudit
        public HttpResponseMessage PostAttendanceAudit(AttendanceAudit attendanceaudit)
        {
            if (ModelState.IsValid)
            {
                attendanceaudit.Employee = null;
                attendanceaudit.InsertBy = loginUser.UserID;
                db.AttendanceAudits.Add(attendanceaudit);
                db.Entry(attendanceaudit).State = attendanceaudit.AttendanceAuditID == 0 ?
               EntityState.Added : EntityState.Modified;
                db.SaveChanges();
               

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, attendanceaudit);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = attendanceaudit.AttendanceAuditID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AttendanceAudit/5
        public HttpResponseMessage DeleteAttendanceAudit(long id)
        {
            AttendanceAudit attendanceaudit = db.AttendanceAudits.Find(id);
            if (attendanceaudit == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AttendanceAudits.Remove(attendanceaudit);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, attendanceaudit);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}