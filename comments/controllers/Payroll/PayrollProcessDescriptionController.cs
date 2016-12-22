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
    public class PayrollProcessDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PayrollProcessDescription
        public IEnumerable<PayrollProcessDescription> GetPayrollProcessDescriptions(string MonthYear)
        {
            PayrollProcess pp = db.PayrollProcesses.Where(p => p.MonthYear == MonthYear).SingleOrDefault();
            return db.PayrollProcessDescriptions.Include(e => e.Employee).Include(c => c.SalaryComponent).Where(p=>p.PayrollProcessID==pp.PayrollProcessID) as IEnumerable<PayrollProcessDescription>;
        }

        // GET api/PayrollProcessDescription/5
        public PayrollProcessDescription GetPayrollProcessDescription(long id)
        {
            PayrollProcessDescription payrollprocessdescription = db.PayrollProcessDescriptions.Find(id);
            if (payrollprocessdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return payrollprocessdescription;
        }

        // PUT api/PayrollProcessDescription/5
        public HttpResponseMessage PutPayrollProcessDescription(long id, PayrollProcessDescription payrollprocessdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != payrollprocessdescription.PayrollProcessDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(payrollprocessdescription).State = EntityState.Modified;

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

        // POST api/PayrollProcessDescription
        public HttpResponseMessage PostPayrollProcessDescription(PayrollProcessDescription payrollprocessdescription)
        {
            if (ModelState.IsValid)
            {
                db.PayrollProcessDescriptions.Add(payrollprocessdescription);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, payrollprocessdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = payrollprocessdescription.PayrollProcessDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PayrollProcessDescription/5
        public HttpResponseMessage DeletePayrollProcessDescription(long id)
        {
            PayrollProcessDescription payrollprocessdescription = db.PayrollProcessDescriptions.Find(id);
            if (payrollprocessdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PayrollProcessDescriptions.Remove(payrollprocessdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, payrollprocessdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}