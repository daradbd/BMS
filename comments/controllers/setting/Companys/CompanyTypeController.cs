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
using BMS.Models.Setting.Companys;
using BMS.Models;

namespace BMS.Controllers.Setting.Companys
{
    public class CompanyTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/CompanyType
        public IEnumerable<CompanyType> GetCompanyTypes()
        {
            return db.CompanyTypes.AsEnumerable();
        }

        // GET api/CompanyType/5
        public CompanyType GetCompanyType(long id)
        {
            CompanyType companytype = db.CompanyTypes.Find(id);
            if (companytype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return companytype;
        }

        // PUT api/CompanyType/5
        public HttpResponseMessage PutCompanyType(long id, CompanyType companytype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != companytype.CompanyTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(companytype).State = EntityState.Modified;

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

        // POST api/CompanyType
        public HttpResponseMessage PostCompanyType(CompanyType companytype)
        {
            if (ModelState.IsValid)
            {
                db.CompanyTypes.Add(companytype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, companytype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = companytype.CompanyTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CompanyType/5
        public HttpResponseMessage DeleteCompanyType(long id)
        {
            CompanyType companytype = db.CompanyTypes.Find(id);
            if (companytype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CompanyTypes.Remove(companytype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, companytype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}