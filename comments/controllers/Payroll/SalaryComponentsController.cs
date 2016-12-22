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
    public class SalaryComponentsController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalaryComponents
        public IEnumerable<SalaryComponent> GetSalaryComponents(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.SalaryComponents.AsQueryable().Include(p=>p.PayType).Include(c=>c.CalculationType)) as IEnumerable<SalaryComponent>;
        }

        // GET api/SalaryComponents/5
        public SalaryComponent GetSalaryComponent(long id)
        {
            SalaryComponent salarycomponent = db.SalaryComponents.Find(id);
            if (salarycomponent == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salarycomponent;
        }

        // PUT api/SalaryComponents/5
        public HttpResponseMessage PutSalaryComponent(long id, SalaryComponent salarycomponent)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            salarycomponent.PayType = null;
            salarycomponent.CalculationType = null;

            if (id != salarycomponent.SalaryComponentID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salarycomponent).State = EntityState.Modified;

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

        // POST api/SalaryComponents
        public HttpResponseMessage PostSalaryComponent(SalaryComponent salarycomponent)
        {
            if (ModelState.IsValid)
            {
                salarycomponent.PayType = null;
                salarycomponent.CalculationType = null;

                db.SalaryComponents.Add(salarycomponent);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salarycomponent);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salarycomponent.SalaryComponentID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalaryComponents/5
        public HttpResponseMessage DeleteSalaryComponent(long id)
        {
            SalaryComponent salarycomponent = db.SalaryComponents.Find(id);
            if (salarycomponent == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalaryComponents.Remove(salarycomponent);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salarycomponent);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}