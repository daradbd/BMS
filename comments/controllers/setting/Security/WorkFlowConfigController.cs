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
    public class WorkFlowConfigController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/WorkFlowConfig
        public IEnumerable<WorkFlowConfig> GetWorkFlowConfigs()
        {
            return db.WorkFlowConfigs.AsEnumerable();
        }

        // GET api/WorkFlowConfig/5
        public WorkFlowConfig GetWorkFlowConfig(long id)
        {
            WorkFlowConfig workflowconfig = db.WorkFlowConfigs.Find(id);
            if (workflowconfig == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workflowconfig;
        }

        // PUT api/WorkFlowConfig/5
        public HttpResponseMessage PutWorkFlowConfig(long id, WorkFlowConfig workflowconfig)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != workflowconfig.WorkFlowConfigID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(workflowconfig).State = EntityState.Modified;

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

        // POST api/WorkFlowConfig
        public HttpResponseMessage PostWorkFlowConfig(WorkFlowConfig workflowconfig)
        {
            if (ModelState.IsValid)
            {
                db.WorkFlowConfigs.Add(workflowconfig);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workflowconfig);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workflowconfig.WorkFlowConfigID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/WorkFlowConfig/5
        public HttpResponseMessage DeleteWorkFlowConfig(long id)
        {
            WorkFlowConfig workflowconfig = db.WorkFlowConfigs.Find(id);
            if (workflowconfig == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkFlowConfigs.Remove(workflowconfig);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workflowconfig);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}