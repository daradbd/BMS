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
using BMS.Models.Resources;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Resources
{
    public class AttachFileController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/AttachFile
        public IEnumerable<AttachFile> GetAttachFiles(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.AttachFiles.AsQueryable()) as IEnumerable<AttachFile>;
        }

        // GET api/AttachFile/5
        public AttachFile GetAttachFile(long id)
        {
            AttachFile attachfile = db.AttachFiles.Find(id);
            if (attachfile == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return attachfile;
        }

        // PUT api/AttachFile/5
        public HttpResponseMessage PutAttachFile(long id, AttachFile attachfile)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != attachfile.AttachFileID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(attachfile).State = EntityState.Modified;

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

        // POST api/AttachFile
        public HttpResponseMessage PostAttachFile(AttachFile attachfile)
        {
            if (ModelState.IsValid)
            {
                db.Entry(attachfile).State = attachfile.AttachFileID == 0 ?
              EntityState.Added : EntityState.Modified;
               // db.AttachFiles.Add(attachfile);
                
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, attachfile);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = attachfile.AttachFileID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AttachFile/5
        public HttpResponseMessage DeleteAttachFile(long id)
        {
            AttachFile attachfile = db.AttachFiles.Find(id);
            if (attachfile == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AttachFiles.Remove(attachfile);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, attachfile);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}