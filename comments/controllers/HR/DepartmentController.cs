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
    public class DepartmentController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Department
        public IEnumerable<Department> GetDepartments()
        {
            ////var myCookie = new HttpCookie("DARADERP");
            ////myCookie["BranchID"] = "420";

            //HttpContext.Current.Response.Cookies.Add(myCookie);
            return db.Departments.AsEnumerable();
        }

        // GET api/Department/5
        public Department GetDepartment(long id)
        {
            Department department = db.Departments.Find(id);
            if (department == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return department;
        }

        // PUT api/Department/5
        public HttpResponseMessage PutDepartment(long id, Department department)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != department.DepartmentID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            department.UpdateBy = loginUser.UserID;

            db.Entry(department).State = EntityState.Modified;

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

        // POST api/Department
        public HttpResponseMessage PostDepartment(Department department)
        {
            if (ModelState.IsValid)
            {
                department.InsertBy = loginUser.UserID;
                db.Departments.Add(department);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, department);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = department.DepartmentID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Department/5
        public HttpResponseMessage DeleteDepartment(long id)
        {
            Department department = db.Departments.Find(id);
            if (department == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Departments.Remove(department);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, department);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}