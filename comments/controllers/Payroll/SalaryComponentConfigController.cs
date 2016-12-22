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

namespace BMS.Controllers.Payroll
{
    public class SalaryComponentConfigController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalaryComponentConfig
        public IEnumerable<SalaryComponentConfig> GetSalaryComponentConfigs()
        {
            return db.SalaryComponentConfigs.AsEnumerable();
        }

        // GET api/SalaryComponentConfig/5
        public SalaryComponentConfig GetSalaryComponentConfig(long id)
        {
            SalaryComponentConfig salarycomponentconfig = db.SalaryComponentConfigs.Find(id);
            if (salarycomponentconfig == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salarycomponentconfig;
        }

        // PUT api/SalaryComponentConfig/5
        public HttpResponseMessage PutSalaryComponentConfig(long id, SalaryComponentConfig salarycomponentconfig)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salarycomponentconfig.SalaryComponentConfigID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salarycomponentconfig).State = EntityState.Modified;

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

        // POST api/SalaryComponentConfig
        public HttpResponseMessage PostSalaryComponentConfig(SalaryComponentConfig salarycomponentconfig)
        {
            if (ModelState.IsValid)
            {
                db.SalaryComponentConfigs.Add(salarycomponentconfig);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salarycomponentconfig);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salarycomponentconfig.SalaryComponentConfigID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalaryComponentConfig/5
        public HttpResponseMessage DeleteSalaryComponentConfig(long id)
        {
            SalaryComponentConfig salarycomponentconfig = db.SalaryComponentConfigs.Find(id);
            if (salarycomponentconfig == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalaryComponentConfigs.Remove(salarycomponentconfig);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salarycomponentconfig);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}