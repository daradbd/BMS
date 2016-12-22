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
    public class SalaryComponentMappingController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalaryComponentMapping
        public HttpResponseMessage GetSalaryComponentMappings()
        {

            var result = from x in db.SalaryComponentConfigs
                         join y in db.SalaryComponentMappings on x.SalaryComponentConfigID equals y.SalaryComponentConfigID into CompMapping
                         from xy in CompMapping.DefaultIfEmpty()
                         select new
                         {
                             SalaryComponentMappingID = (long?)xy.SalaryComponentMappingID==null?0:xy.SalaryComponentMappingID,
                             SalaryComponentMappingCode = xy.SalaryComponentMappingCode,
                             SalaryComponentConfigID = x.SalaryComponentConfigID==null?0:x.SalaryComponentConfigID,
                             SalaryComponentID = xy.SalaryComponentID==null?0:xy.SalaryComponentID,
                             SalaryComponentConfigName = x.SalaryComponentConfigName
                         };
            //return db.AccCOAMappings.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/SalaryComponentMapping/5
        public SalaryComponentMapping GetSalaryComponentMapping(long id)
        {
            SalaryComponentMapping salarycomponentmapping = db.SalaryComponentMappings.Find(id);
            if (salarycomponentmapping == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salarycomponentmapping;
        }

        // PUT api/SalaryComponentMapping/5
        public HttpResponseMessage PutSalaryComponentMapping(long id, SalaryComponentMapping salarycomponentmapping)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salarycomponentmapping.SalaryComponentMappingID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salarycomponentmapping).State = EntityState.Modified;

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

        // POST api/SalaryComponentMapping
        public HttpResponseMessage PostSalaryComponentMapping(SalaryComponentMapping salarycomponentmapping)
        {
            if (ModelState.IsValid)
            {
                salarycomponentmapping.InsertBy = loginUser.UserID;
                db.SalaryComponentMappings.Add(salarycomponentmapping);
                db.Entry(salarycomponentmapping).State = salarycomponentmapping.SalaryComponentMappingID == 0 ?
               EntityState.Added : EntityState.Modified;
                db.SaveChanges();
                

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salarycomponentmapping);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salarycomponentmapping.SalaryComponentMappingID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalaryComponentMapping/5
        public HttpResponseMessage DeleteSalaryComponentMapping(long id)
        {
            SalaryComponentMapping salarycomponentmapping = db.SalaryComponentMappings.Find(id);
            if (salarycomponentmapping == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalaryComponentMappings.Remove(salarycomponentmapping);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salarycomponentmapping);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}