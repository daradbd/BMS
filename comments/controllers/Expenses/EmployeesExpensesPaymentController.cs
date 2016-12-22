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
    public class EmployeesExpensesPaymentController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/EmployeesExpensesPayment
        public IEnumerable<EmployeesExpensesPayment> GetEmployeesExpensesPayments()
        {
            return db.EmployeesExpensesPayments.AsEnumerable();
        }

        // GET api/EmployeesExpensesPayment/5
        public EmployeesExpensesPayment GetEmployeesExpensesPayment(long id)
        {
            EmployeesExpensesPayment employeesexpensespayment = db.EmployeesExpensesPayments.Find(id);
            if (employeesexpensespayment == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return employeesexpensespayment;
        }

        // PUT api/EmployeesExpensesPayment/5
        public HttpResponseMessage PutEmployeesExpensesPayment(long id, EmployeesExpensesPayment employeesexpensespayment)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != employeesexpensespayment.EmployeesExpensesPaymentID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            employeesexpensespayment.UpdateBy = loginUser.UserID;
            db.Entry(employeesexpensespayment).State = EntityState.Modified;

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

        // POST api/EmployeesExpensesPayment
        public HttpResponseMessage PostEmployeesExpensesPayment(EmployeesExpensesPayment employeesexpensespayment)
        {
            if (ModelState.IsValid)
            {
                employeesexpensespayment.InsertBy = loginUser.UserID;
                db.EmployeesExpensesPayments.Add(employeesexpensespayment);
                db.SaveChanges();
                var TotalPayment = (db.EmployeesExpensesPayments.Where(r => (r.EmployeesExpensesID == employeesexpensespayment.EmployeesExpensesID) && (r.EmployeeID == employeesexpensespayment.EmployeeID)).Select(r => r.PaymentAmount)).ToList().Sum();
                EmployeesExpenses employeesexpenses = db.EmployeesExpenses.Find(employeesexpensespayment.EmployeesExpensesID);
                employeesexpenses.PaymentAmount = (decimal)TotalPayment;
                employeesexpenses.DueAmount =employeesexpenses.ApproveAmount- (decimal)TotalPayment;
                db.Entry(employeesexpenses).State = EntityState.Modified;
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, employeesexpensespayment);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = employeesexpensespayment.EmployeesExpensesPaymentID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/EmployeesExpensesPayment/5
        public HttpResponseMessage DeleteEmployeesExpensesPayment(long id)
        {
            EmployeesExpensesPayment employeesexpensespayment = db.EmployeesExpensesPayments.Find(id);
            if (employeesexpensespayment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.EmployeesExpensesPayments.Remove(employeesexpensespayment);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, employeesexpensespayment);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}