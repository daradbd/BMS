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
    public class CompanyBranchCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/CompanyBranchCategory
        public IEnumerable<CompanyBranchCategory> GetCompanyBranchCategories()
        {
            return db.CompanyBranchCategories.AsEnumerable();
        }

        // GET api/CompanyBranchCategory/5
        public CompanyBranchCategory GetCompanyBranchCategory(long id)
        {
            CompanyBranchCategory companybranchcategory = db.CompanyBranchCategories.Find(id);
            if (companybranchcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return companybranchcategory;
        }

        // PUT api/CompanyBranchCategory/5
        public HttpResponseMessage PutCompanyBranchCategory(long id, CompanyBranchCategory companybranchcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != companybranchcategory.CompanyBranchCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(companybranchcategory).State = EntityState.Modified;

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

        // POST api/CompanyBranchCategory
        public HttpResponseMessage PostCompanyBranchCategory(CompanyBranchCategory companybranchcategory)
        {
            if (ModelState.IsValid)
            {
                db.CompanyBranchCategories.Add(companybranchcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, companybranchcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = companybranchcategory.CompanyBranchCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CompanyBranchCategory/5
        public HttpResponseMessage DeleteCompanyBranchCategory(long id)
        {
            CompanyBranchCategory companybranchcategory = db.CompanyBranchCategories.Find(id);
            if (companybranchcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CompanyBranchCategories.Remove(companybranchcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, companybranchcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}