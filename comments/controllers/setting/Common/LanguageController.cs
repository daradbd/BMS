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
using BMS.Models.Setting.Common;
using BMS.Models;

namespace BMS.Controllers.Setting.Common
{
    public class LanguageController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Language
        public IEnumerable<Language> GetLanguages()
        {
            return db.Languages.AsEnumerable();
        }

        // GET api/Language/5
        public Language GetLanguage(long id)
        {
            Language language = db.Languages.Find(id);
            if (language == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return language;
        }

        // PUT api/Language/5
        public HttpResponseMessage PutLanguage(long id, Language language)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != language.LanguageID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            language.UpdateBy = loginUser.UserID;
            db.Entry(language).State = EntityState.Modified;

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

        // POST api/Language
        public HttpResponseMessage PostLanguage(Language language)
        {
            if (ModelState.IsValid)
            {
                language.InsertBy = loginUser.UserID;
                db.Languages.Add(language);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, language);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = language.LanguageID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Language/5
        public HttpResponseMessage DeleteLanguage(long id)
        {
            Language language = db.Languages.Find(id);
            if (language == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Languages.Remove(language);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, language);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}