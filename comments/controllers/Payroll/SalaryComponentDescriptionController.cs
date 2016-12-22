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
    public class SalaryComponentDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SalaryComponentDescription
        public IEnumerable<SalaryComponentDescription> GetSalaryComponentDescriptions()
        {
            return db.SalaryComponentDescriptions.AsEnumerable().Where(s=>s.IsActive==true);
        }

        // GET api/SalaryComponentDescription/5
        public HttpResponseMessage GetSalaryComponentDescription(long id)
        {
           // SalaryComponentDescription salarycomponentdescription = db.SalaryComponentDescriptions.Find(id);
            var empComp = db.SalaryComponentDescriptions.Where(e => e.EmployeeID == id);
            var result = from x in db.SalaryComponents
                         join y in empComp on x.SalaryComponentID equals y.SalaryComponentID into empSalarycomponent
                         from xy in empSalarycomponent.DefaultIfEmpty()

                         select new
                         {
                             SalaryComponentDescriptionID = xy.SalaryComponentDescriptionID == null ? 0 : xy.SalaryComponentDescriptionID,
                             EmployeeID = id,
                             SalaryComponentDescriptionCode = xy.SalaryComponentDescriptionCode,
                             SalaryComponentID = x.SalaryComponentID,
                             SalaryComponentName = x.SalaryComponentName,
                             CTCPercentage=x.CTCPercentage,
                             IsCTCBase=x.IsCTCBase,
                             PayType = x.PayType,

                             ComponentValue = xy.ComponentValue == null ? (decimal)0.00 : xy.ComponentValue,
                             Formula = xy.Formula
                         };
            //return db.AccCOAMappings.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // PUT api/SalaryComponentDescription/5
        public HttpResponseMessage PutSalaryComponentDescription(long id, SalaryComponentDescription salarycomponentdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salarycomponentdescription.SalaryComponentDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(salarycomponentdescription).State = EntityState.Modified;

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

        // POST api/SalaryComponentDescription
        public HttpResponseMessage PostSalaryComponentDescription(SalaryComponentDescription salarycomponentdescription)
        {
            if (ModelState.IsValid)
            {
                db.Entry(salarycomponentdescription).State = salarycomponentdescription.SalaryComponentDescriptionID == 0 ?
                  EntityState.Added : EntityState.Modified;
                db.SaveChanges();
                

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salarycomponentdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salarycomponentdescription.SalaryComponentDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalaryComponentDescription/5
        public HttpResponseMessage DeleteSalaryComponentDescription(long id)
        {
            SalaryComponentDescription salarycomponentdescription = db.SalaryComponentDescriptions.Find(id);
            if (salarycomponentdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalaryComponentDescriptions.Remove(salarycomponentdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salarycomponentdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}