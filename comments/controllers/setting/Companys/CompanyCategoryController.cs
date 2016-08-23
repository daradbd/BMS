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
    public class CompanyCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/CompanyCategory
        public IEnumerable<CompanyCategory> GetCompanyCategories()
        {
            return db.CompanyCategories.AsEnumerable();
        }

        // GET api/CompanyCategory/5
        public CompanyCategory GetCompanyCategory(long id)
        {
            CompanyCategory companycategory = db.CompanyCategories.Find(id);
            if (companycategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return companycategory;
        }

        // PUT api/CompanyCategory/5
        public HttpResponseMessage PutCompanyCategory(long id, CompanyCategory companycategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != companycategory.CompanyCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            companycategory.UpdateBy = loginUser.UserID;
            db.Entry(companycategory).State = EntityState.Modified;

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

        // POST api/CompanyCategory
        public HttpResponseMessage PostCompanyCategory(CompanyCategory companycategory)
        {
            if (ModelState.IsValid)
            {
                companycategory.InsertBy = loginUser.UserID;
                db.CompanyCategories.Add(companycategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, companycategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = companycategory.CompanyCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CompanyCategory/5
        public HttpResponseMessage DeleteCompanyCategory(long id)
        {
            CompanyCategory companycategory = db.CompanyCategories.Find(id);
            if (companycategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CompanyCategories.Remove(companycategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, companycategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}