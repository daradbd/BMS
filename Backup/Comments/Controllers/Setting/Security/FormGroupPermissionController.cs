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
    public class FormGroupPermissionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/FormGroupPermission
        public IEnumerable<FormGroupPermission> GetFormGroupPermissions()
        {
            return db.FormGroupPermissions.AsEnumerable();
        }

        // GET api/FormGroupPermission/5
        public FormGroupPermission GetFormGroupPermission(long id)
        {
            FormGroupPermission formgrouppermission = db.FormGroupPermissions.Find(id);
            if (formgrouppermission == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return formgrouppermission;
        }

        // PUT api/FormGroupPermission/5
        public HttpResponseMessage PutFormGroupPermission(long id, FormGroupPermission formgrouppermission)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != formgrouppermission.FormGroupPermissionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(formgrouppermission).State = EntityState.Modified;

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

        // POST api/FormGroupPermission
        public HttpResponseMessage PostFormGroupPermission(FormGroupPermission formgrouppermission)
        {
            if (ModelState.IsValid)
            {
                db.FormGroupPermissions.Add(formgrouppermission);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, formgrouppermission);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = formgrouppermission.FormGroupPermissionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/FormGroupPermission/5
        public HttpResponseMessage DeleteFormGroupPermission(long id)
        {
            FormGroupPermission formgrouppermission = db.FormGroupPermissions.Find(id);
            if (formgrouppermission == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.FormGroupPermissions.Remove(formgrouppermission);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, formgrouppermission);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}