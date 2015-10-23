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
using BMS.Models.Setting.Security;
using BMS.Models;

namespace BMS.Controllers.Setting.Security
{
    public class FormListController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/FormList
        public IEnumerable<FormList> GetFormLists()
        {
            return db.FormLists.AsEnumerable();
        }

        // GET api/FormList/5
        public FormList GetFormList(long id)
        {
            FormList formlist = db.FormLists.Find(id);
            if (formlist == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return formlist;
        }

        // PUT api/FormList/5
        public HttpResponseMessage PutFormList(long id, FormList formlist)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != formlist.FormID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(formlist).State = EntityState.Modified;

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

        // POST api/FormList
        public HttpResponseMessage PostFormList(FormList formlist)
        {
            if (ModelState.IsValid)
            {
                db.FormLists.Add(formlist);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, formlist);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = formlist.FormID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/FormList/5
        public HttpResponseMessage DeleteFormList(long id)
        {
            FormList formlist = db.FormLists.Find(id);
            if (formlist == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.FormLists.Remove(formlist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, formlist);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}