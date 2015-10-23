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
    public class CompanyBranchTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/CompanyBranchType
        public IEnumerable<CompanyBranchType> GetCompanyBranchTypes()
        {
            return db.CompanyBranchTypes.AsEnumerable();
        }

        // GET api/CompanyBranchType/5
        public CompanyBranchType GetCompanyBranchType(long id)
        {
            CompanyBranchType companybranchtype = db.CompanyBranchTypes.Find(id);
            if (companybranchtype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return companybranchtype;
        }

        // PUT api/CompanyBranchType/5
        public HttpResponseMessage PutCompanyBranchType(long id, CompanyBranchType companybranchtype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != companybranchtype.CompanyBranchTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(companybranchtype).State = EntityState.Modified;

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

        // POST api/CompanyBranchType
        public HttpResponseMessage PostCompanyBranchType(CompanyBranchType companybranchtype)
        {
            if (ModelState.IsValid)
            {
                db.CompanyBranchTypes.Add(companybranchtype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, companybranchtype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = companybranchtype.CompanyBranchTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CompanyBranchType/5
        public HttpResponseMessage DeleteCompanyBranchType(long id)
        {
            CompanyBranchType companybranchtype = db.CompanyBranchTypes.Find(id);
            if (companybranchtype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CompanyBranchTypes.Remove(companybranchtype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, companybranchtype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}