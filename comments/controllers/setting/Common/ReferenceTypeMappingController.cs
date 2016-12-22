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
    public class ReferenceTypeMappingController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/ReferenceTypeMapping
        public IEnumerable<ReferenceTypeMapping> GetReferenceTypeMappings()
        {
            return db.ReferenceTypeMappings.AsEnumerable();
        }

        // GET api/ReferenceTypeMapping/5
        public ReferenceTypeMapping GetReferenceTypeMapping(long id)
        {
            ReferenceTypeMapping referencetypemapping = db.ReferenceTypeMappings.Find(id);
            if (referencetypemapping == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return referencetypemapping;
        }

        // PUT api/ReferenceTypeMapping/5
        public HttpResponseMessage PutReferenceTypeMapping(long id, ReferenceTypeMapping referencetypemapping)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != referencetypemapping.ReferenceTypeMappingID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(referencetypemapping).State = EntityState.Modified;

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

        // POST api/ReferenceTypeMapping
        public HttpResponseMessage PostReferenceTypeMapping(ReferenceTypeMapping referencetypemapping)
        {
            if (ModelState.IsValid)
            {
                db.ReferenceTypeMappings.Add(referencetypemapping);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, referencetypemapping);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = referencetypemapping.ReferenceTypeMappingID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ReferenceTypeMapping/5
        public HttpResponseMessage DeleteReferenceTypeMapping(long id)
        {
            ReferenceTypeMapping referencetypemapping = db.ReferenceTypeMappings.Find(id);
            if (referencetypemapping == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ReferenceTypeMappings.Remove(referencetypemapping);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, referencetypemapping);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}