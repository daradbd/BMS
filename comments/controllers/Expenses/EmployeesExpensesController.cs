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

namespace BMS.Controllers.Expenses
{
    public class EmployeesExpensesController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/EmployeesExpenses
        public IEnumerable<EmployeesExpenses> GetEmployeesExpenses()
        {
            return db.EmployeesExpenses.AsEnumerable();
        }

        // GET api/EmployeesExpenses/5
        public EmployeesExpenses GetEmployeesExpenses(long id)
        {
            EmployeesExpenses employeesexpenses = db.EmployeesExpenses.Find(id);
            if (employeesexpenses == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeesexpenses;
        }

        // PUT api/EmployeesExpenses/5
        public HttpResponseMessage PutEmployeesExpenses(long id, EmployeesExpenses employeesexpenses)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeesexpenses.EmployeesExpensesID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(employeesexpenses).State = EntityState.Modified;

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

        // POST api/EmployeesExpenses
        public HttpResponseMessage PostEmployeesExpenses(EmployeesExpenses employeesexpenses)
        {
            if (ModelState.IsValid)
            {
                db.EmployeesExpenses.Add(employeesexpenses);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeesexpenses);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeesexpenses.EmployeesExpensesID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeesExpenses/5
        public HttpResponseMessage DeleteEmployeesExpenses(long id)
        {
            EmployeesExpenses employeesexpenses = db.EmployeesExpenses.Find(id);
            if (employeesexpenses == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeesExpenses.Remove(employeesexpenses);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeesexpenses);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}