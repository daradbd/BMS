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
    public class DesignationController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Designation
        public IEnumerable<Designation> GetDesignations()
        {
            //HttpCookie objHTTPCk = HttpContext.Current.Request.Cookies.Get("DARADERP");
            return db.Designations.AsEnumerable();
        }

        // GET api/Designation/5
        public Designation GetDesignation(long id)
        {
            Designation designation = db.Designations.Find(id);
            if (designation == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return designation;
        }

        // PUT api/Designation/5
        public HttpResponseMessage PutDesignation(long id, Designation designation)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != designation.DesignationID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            designation.UpdateBy = loginUser.UserID;

            db.Entry(designation).State = EntityState.Modified;

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

        // POST api/Designation
        public HttpResponseMessage PostDesignation(Designation designation)
        {
            if (ModelState.IsValid)
            {
                designation.InsertBy = loginUser.UserID;
                db.Designations.Add(designation);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, designation);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = designation.DesignationID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Designation/5
        public HttpResponseMessage DeleteDesignation(long id)
        {
            Designation designation = db.Designations.Find(id);
            if (designation == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Designations.Remove(designation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, designation);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}