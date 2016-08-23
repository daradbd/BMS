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
        public HttpResponseMessage GetFormUserPermissions()
        {
            LoginUser loginUser = new LoginUser();

            long id = (long)loginUser.UserID;
            var useperm = db.FormUserPermissions.Where(u => u.UserID == id);
            var result = from x in db.FormLists
                         join y in useperm on x.FormID equals y.FormID into userPermission
                         from xy in userPermission.DefaultIfEmpty()

                         select new
                         {
                             FormUserPermissionID = xy.FormUserPermissionID == null ? 0 : xy.FormUserPermissionID,
                             UserID = id,
                             FormUserPermissionCode = xy.FormUserPermissionCode,
                             state=x.state,
                             FormID = x.FormID,
                             View = xy.View == null ? false : xy.View,
                             Insert = xy.Insert == null ? false : xy.Insert,
                             Update = xy.Update == null ? false : xy.Update,
                             Delete = xy.Delete == null ? false : xy.Delete,
                             FormName = x.FormName,
                             ModuleName = x.Module.ModuleName
                         };
            //return db.AccCOAMappings.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/FormUserPermission/5
        public HttpResponseMessage GetFormUserPermission(long id)
        {
            var useperm = db.FormUserPermissions.Where(u => u.UserID == id);
            var result = from x in db.FormLists
                         join y in useperm on x.FormID equals y.FormID into userPermission
                         from xy in userPermission.DefaultIfEmpty()

                         select new
                         {
                             FormUserPermissionID = xy.FormUserPermissionID == null ? 0 : xy.FormUserPermissionID,
                             UserID=id,
                             FormUserPermissionCode = xy.FormUserPermissionCode,
                             FormID = x.FormID,
                             View = xy.View == null ? false : xy.View,
                             Insert = xy.Insert == null ? false : xy.Insert,
                             Update = xy.Update == null ? false : xy.Update,
                             Delete = xy.Delete == null ? false : xy.Delete,
                             FormName = x.FormName,
                             ModuleName = x.Module.ModuleName
                         };
            //return db.AccCOAMappings.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
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
                db.Entry(formuserpermission).State = formuserpermission.FormUserPermissionID == 0 ?
               EntityState.Added : EntityState.Modified;
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