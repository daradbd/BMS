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
using BMS.Models.Project;
using BMS.Models;

namespace BMS.Controllers.Project
{
    public class ProjectSetupController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProjectSetup
        public IEnumerable<ProjectSetup> GetProjectSetups()
        {
            return db.ProjectSetups.AsEnumerable();
        }

        // GET api/ProjectSetup/5
        public ProjectSetup GetProjectSetup(long id)
        {
            ProjectSetup projectsetup = db.ProjectSetups.Find(id);
            if (projectsetup == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return projectsetup;
        }

        // PUT api/ProjectSetup/5
        public HttpResponseMessage PutProjectSetup(long id, ProjectSetup projectsetup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != projectsetup.ProjectID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(projectsetup).State = EntityState.Modified;

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

        // POST api/ProjectSetup
        public HttpResponseMessage PostProjectSetup(ProjectSetup projectsetup)
        {
            if (ModelState.IsValid)
            {
                //db.ProjectSetups.Add(projectsetup);
                projectsetup.InsertBy = loginUser.UserID;
                db.Entry(projectsetup).State = projectsetup.ProjectID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, projectsetup);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = projectsetup.ProjectID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProjectSetup/5
        public HttpResponseMessage DeleteProjectSetup(long id)
        {
            ProjectSetup projectsetup = db.ProjectSetups.Find(id);
            if (projectsetup == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProjectSetups.Remove(projectsetup);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, projectsetup);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}