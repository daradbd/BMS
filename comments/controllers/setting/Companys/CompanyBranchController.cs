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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Setting.Companys
{
    public class CompanyBranchController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();
        // GET api/CompanyBranch
        public IEnumerable<CompanyBranch> GetCompanyBranches(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.CompanyBranches) as IEnumerable<CompanyBranch>;
        }

        // GET api/CompanyBranch/5
        public CompanyBranch GetCompanyBranch(long id)
        {
            CompanyBranch companybranch = db.CompanyBranches.Find(id);
            companybranch.Company = db.Companies.Where(c => c.CompanyID == companybranch.CompanyID).FirstOrDefault();
            companybranch.CompanyBranchType = db.CompanyBranchTypes.Where(c => c.CompanyBranchTypeID == companybranch.CompanyBranchTypeID).FirstOrDefault();
            companybranch.CompanyBranchCategory = db.CompanyBranchCategories.Where(c => c.CompanyBranchCategoryID == companybranch.CompanyBranchCategoryID).FirstOrDefault();
            companybranch.Country= db.Countries.Where(c => c.CountryID == companybranch.CountryID).FirstOrDefault();
            companybranch.City = db.Cities.Where(c => c.CityID == companybranch.CityID).FirstOrDefault();
            companybranch.Language = db.Languages.Where(l => l.LanguageID == companybranch.LanguageID).FirstOrDefault();
            companybranch.Currency = db.Currencies.Where(c => c.CurrencyID == companybranch.CurrencyID).FirstOrDefault();
            if (companybranch == null)
            { 
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return companybranch;
        }

        // PUT api/CompanyBranch/5
        public HttpResponseMessage PutCompanyBranch(long id, CompanyBranch companybranch)
        {
             companybranch.Company =null;
             companybranch.CompanyBranchType = null;
             companybranch.CompanyBranchCategory = null;
             companybranch.Country= null;
             companybranch.City = null;
             companybranch.Language =null;
             companybranch.Currency = null;
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != companybranch.CompanyBranchID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            companybranch.UpdateBy = loginUser.UserID;
            db.Entry(companybranch).State = EntityState.Modified;

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

        // POST api/CompanyBranch
        public HttpResponseMessage PostCompanyBranch(CompanyBranch companybranch)
        {
            if (ModelState.IsValid)
            {
                companybranch.InsertBy = loginUser.UserID;
                db.CompanyBranches.Add(companybranch);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, companybranch);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = companybranch.CompanyBranchID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CompanyBranch/5
        public HttpResponseMessage DeleteCompanyBranch(long id)
        {
            CompanyBranch companybranch = db.CompanyBranches.Find(id);
            if (companybranch == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CompanyBranches.Remove(companybranch);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, companybranch);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}