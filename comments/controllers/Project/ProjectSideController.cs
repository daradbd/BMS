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
    public class ProjectSideController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ProjectSide
        public IEnumerable<ProjectSide> GetProjectSides()
        {
            return db.ProjectSides.AsEnumerable();
        }

        // GET api/ProjectSide/5
        public ProjectSide GetProjectSide(long id)
        {
            ProjectSide projectside = db.ProjectSides.Find(id);
            if (projectside == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return projectside;
        }

        // PUT api/ProjectSide/5
        public HttpResponseMessage PutProjectSide(long id, ProjectSide projectside)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != projectside.ProjectSideID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(projectside).State = EntityState.Modified;

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

        // POST api/ProjectSide
        public HttpResponseMessage PostProjectSide(ProjectSide projectside)
        {
            if (ModelState.IsValid)
            {
                //db.ProjectSides.Add(projectside);
                db.Entry(projectside).State = projectside.ProjectSideID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, projectside);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = projectside.ProjectSideID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProjectSide/5
        public HttpResponseMessage DeleteProjectSide(long id)
        {
            ProjectSide projectside = db.ProjectSides.Find(id);
            if (projectside == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProjectSides.Remove(projectside);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, projectside);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}