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
using BMS.Models.Accounting.Transaction;
using BMS.Models;

namespace BMS.Controllers.Accounting.Transaction
{
    public class GLedgerController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/GLedger
        public IEnumerable<GLedger> GetGLedgers()
        {
            return db.GLedgers.AsEnumerable();
        }

        // GET api/GLedger/5
        public GLedger GetGLedger(long id)
        {
            GLedger gledger = db.GLedgers.Find(id);
            if (gledger == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return gledger;
        }

        // PUT api/GLedger/5
        public HttpResponseMessage PutGLedger(long id, GLedger gledger)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != gledger.GLedgerID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(gledger).State = EntityState.Modified;

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

        // POST api/GLedger
        public HttpResponseMessage PostGLedger(GLedger gledger)
        {
            if (ModelState.IsValid)
            {
                db.GLedgers.Add(gledger);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, gledger);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = gledger.GLedgerID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/GLedger/5
        public HttpResponseMessage DeleteGLedger(long id)
        {
            GLedger gledger = db.GLedgers.Find(id);
            if (gledger == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.GLedgers.Remove(gledger);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, gledger);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}