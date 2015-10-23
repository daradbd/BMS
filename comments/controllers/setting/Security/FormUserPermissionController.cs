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
    public class FormUserPermissionController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/FormUserPermission
        public IEnumerable<FormUserPermission> GetFormUserPermissions()
        {
            return db.FormUserPermissions.AsEnumerable();
        }

        // GET api/FormUserPermission/5
        public FormUserPermission GetFormUserPermission(long id)
        {
            FormUserPermission formuserpermission = db.FormUserPermissions.Find(id);
            if (formuserpermission == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return formuserpermission;
        }

        // PUT api/FormUserPermission/5
        public HttpResponseMessage PutFormUserPermission(long id, FormUserPermission formuserpermission)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != formuserpermission.FormUserPermissionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(formuserpermission).State = EntityState.Modified;

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

        // POST api/FormUserPermission
        public HttpResponseMessage PostFormUserPermission(FormUserPermission formuserpermission)
        {
            if (ModelState.IsValid)
            {
                db.FormUserPermissions.Add(formuserpermission);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, formuserpermission);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = formuserpermission.FormUserPermissionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/FormUserPermission/5
        public HttpResponseMessage DeleteFormUserPermission(long id)
        {
            FormUserPermission formuserpermission = db.FormUserPermissions.Find(id);
            if (formuserpermission == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.FormUserPermissions.Remove(formuserpermission);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, formuserpermission);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}