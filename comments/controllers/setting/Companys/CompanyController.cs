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
    public class CompanyController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Company
        public IEnumerable<Company> GetCompanies()
        {
            var companies = db.Companies.Include(c => c.CompanyCategory).Include(c => c.City).Include(c => c.CompanyType).Include(c => c.Country).Include(c => c.Language).Include(c => c.Currency);
            return companies.AsQueryable();
            
        }

        // GET api/Company/5
        public Company GetCompany(long id)
        {
            Company company = db.Companies.Find(id);
            company.CompanyType = db.CompanyTypes.Where(c => c.CompanyTypeID == company.CompanyTypeID).FirstOrDefault();
            company.CompanyCategory = db.CompanyCategories.Where(cc => cc.CompanyCategoryID == company.CompanyCategoryID).FirstOrDefault();
            company.Country = db.Countries.Where(c => c.CountryID == company.CountryID).FirstOrDefault();
            company.City = db.Cities.Where(c => c.CityID == company.CityID).FirstOrDefault();
            company.Currency = db.Currencies.Where(c => c.CurrencyID == company.CurrencyID).FirstOrDefault();
            company.Language = db.Languages.Where(l => l.LanguageID == company.LanguageID).FirstOrDefault();

            
            if (company == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return company;
        }

        // PUT api/Company/5
        public HttpResponseMessage PutCompany(long id, Company company)
        {
            company.CompanyType = null;
            company.CompanyCategory = null;
            company.Country = null;
            company.City =null;
            company.Currency = null;
            company.Language = null;
            company.UpdateBy = loginUser.UserID;

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != company.CompanyID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(company).State = EntityState.Modified;

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

        // POST api/Company
        public HttpResponseMessage PostCompany(Company company)
        {
            if (ModelState.IsValid)
            {
                company.InsertBy = loginUser.UserID;
                db.Companies.Add(company);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, company);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = company.CompanyID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Company/5
        public HttpResponseMessage DeleteCompany(long id)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Companies.Remove(company);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, company);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}