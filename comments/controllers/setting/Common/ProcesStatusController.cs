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
    public class ProcesStatusController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProcesStatus
        public IEnumerable<ProcesStatus> GetProcesStatus()
        {
            return db.ProcesStatus.AsEnumerable();
        }

        // GET api/ProcesStatus/5
        public ProcesStatus GetProcesStatus(long id)
        {
            ProcesStatus processtatus = db.ProcesStatus.Find(id);
            if (processtatus == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return processtatus;
        }

        // PUT api/ProcesStatus/5
        public HttpResponseMessage PutProcesStatus(long id, ProcesStatus processtatus)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != processtatus.ProcesStatusID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            processtatus.UpdateBy = loginUser.UserID;
            db.Entry(processtatus).State = EntityState.Modified;

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

        // POST api/ProcesStatus
        public HttpResponseMessage PostProcesStatus(ProcesStatus processtatus)
        {
            if (ModelState.IsValid)
            {
                processtatus.InsertBy = loginUser.UserID;
                db.ProcesStatus.Add(processtatus);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, processtatus);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = processtatus.ProcesStatusID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProcesStatus/5
        public HttpResponseMessage DeleteProcesStatus(long id)
        {
            ProcesStatus processtatus = db.ProcesStatus.Find(id);
            if (processtatus == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProcesStatus.Remove(processtatus);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, processtatus);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}