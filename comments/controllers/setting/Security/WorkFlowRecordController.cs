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
    public class WorkFlowRecordController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/WorkFlowRecord
        public IEnumerable<WorkFlowRecord> GetWorkFlowRecords()
        {
            return db.WorkFlowRecords.AsEnumerable();
        }

        // GET api/WorkFlowRecord/5
        public WorkFlowRecord GetWorkFlowRecord(long id)
        {
            WorkFlowRecord workflowrecord = db.WorkFlowRecords.Find(id);
            if (workflowrecord == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workflowrecord;
        }

        // PUT api/WorkFlowRecord/5
        public HttpResponseMessage PutWorkFlowRecord(long id, WorkFlowRecord workflowrecord)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != workflowrecord.WorkFlowRecordID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(workflowrecord).State = EntityState.Modified;

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

        // POST api/WorkFlowRecord
        public HttpResponseMessage PostWorkFlowRecord(WorkFlowRecord workflowrecord)
        {
            if (ModelState.IsValid)
            {
                db.WorkFlowRecords.Add(workflowrecord);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workflowrecord);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workflowrecord.WorkFlowRecordID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/WorkFlowRecord/5
        public HttpResponseMessage DeleteWorkFlowRecord(long id)
        {
            WorkFlowRecord workflowrecord = db.WorkFlowRecords.Find(id);
            if (workflowrecord == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkFlowRecords.Remove(workflowrecord);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workflowrecord);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}