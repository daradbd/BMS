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
using BMS.Models.Expenses;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Expenses
{
    public class EmployeeExpensesDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/EmployeeExpensesDescription
        public IEnumerable<EmployeesExpensesDescription> GetEmployeesExpensesDescriptions(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.EmployeesExpensesDescriptions.AsQueryable().Include(e=>e.ExpensesType).Include(p=>p.Project)) as IEnumerable<EmployeesExpensesDescription>;
        }

        // GET api/EmployeeExpensesDescription/5
        public EmployeesExpensesDescription GetEmployeesExpensesDescription(long id)
        {
            EmployeesExpensesDescription employeesexpensesdescription = db.EmployeesExpensesDescriptions.Find(id);
            if (employeesexpensesdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeesexpensesdescription;
        }

        // PUT api/EmployeeExpensesDescription/5
        public HttpResponseMessage PutEmployeesExpensesDescription(long id, EmployeesExpensesDescription employeesexpensesdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeesexpensesdescription.EmployeesExpensesDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            employeesexpensesdescription.UpdateBy = loginUser.UserID;
            db.Entry(employeesexpensesdescription).State = EntityState.Modified;

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

        // POST api/EmployeeExpensesDescription
        public HttpResponseMessage PostEmployeesExpensesDescription(EmployeesExpensesDescription employeesexpensesdescription)
        {
            if (ModelState.IsValid)
            {
                employeesexpensesdescription.InsertBy = loginUser.UserID;
                db.Entry(employeesexpensesdescription).State = employeesexpensesdescription.EmployeesExpensesDescriptionID == 0 ?
               EntityState.Added : EntityState.Modified;
         
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeesexpensesdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeesexpensesdescription.EmployeesExpensesDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeeExpensesDescription/5
        public HttpResponseMessage DeleteEmployeesExpensesDescription(long id)
        {
            EmployeesExpensesDescription employeesexpensesdescription = db.EmployeesExpensesDescriptions.Find(id);
            if (employeesexpensesdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeesExpensesDescriptions.Remove(employeesexpensesdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeesexpensesdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}