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
    public class EmployeeDetailsController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/EmployeeDetails
        public IEnumerable<EmployeeDetails> GetEmployeeDetails()
        {
            return db.EmployeeDetails.AsEnumerable();
        }

        // GET api/EmployeeDetails/5
        public EmployeeDetails GetEmployeeDetails(long id)
        {
            EmployeeDetails employeedetails = db.EmployeeDetails.Find(id);
            if (employeedetails == null)
            {
                //throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeedetails;
        }

        // PUT api/EmployeeDetails/5
        public HttpResponseMessage PutEmployeeDetails(long id, EmployeeDetails employeedetails)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeedetails.EmployeeDetailsID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(employeedetails).State = EntityState.Modified;

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

        // POST api/EmployeeDetails
        public HttpResponseMessage PostEmployeeDetails(EmployeeDetails employeedetails)
        {
            if (ModelState.IsValid)
            {
                long? employeedetailsID = db.EmployeeDetails.Where(e => e.EmployeeID == employeedetails.EmployeeID).Select(e => e.EmployeeDetailsID).SingleOrDefault();
                if (employeedetailsID>0)
                {
                    employeedetails.EmployeeDetailsID =(long) employeedetailsID;
                    db.Entry(employeedetails).State = EntityState.Modified;
                    db.SaveChanges();
                }
                else
                {
                    db.Entry(employeedetails).State = EntityState.Added;
                    db.SaveChanges();
                }
               
               

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeedetails);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeedetails.EmployeeDetailsID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeDetails/5
        public HttpResponseMessage DeleteEmployeeDetails(long id)
        {
            EmployeeDetails employeedetails = db.EmployeeDetails.Find(id);
            if (employeedetails == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeeDetails.Remove(employeedetails);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeedetails);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}