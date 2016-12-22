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
    public class WorkFlowController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/WorkFlow
        public IEnumerable<WorkFlow> GetWorkFlows()
        {
            return db.WorkFlows.AsEnumerable();
        }

        // GET api/WorkFlow/5
        public WorkFlow GetWorkFlow(long id)
        {
            WorkFlow workflow = db.WorkFlows.Find(id);
            if (workflow == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workflow;
        }

        // PUT api/WorkFlow/5
        public HttpResponseMessage PutWorkFlow(long id, WorkFlow workflow)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != workflow.WorkFlowID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            workflow.UpdateBy = loginUser.UserID;

            db.Entry(workflow).State = EntityState.Modified;

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

        // POST api/WorkFlow
        public HttpResponseMessage PostWorkFlow(WorkFlow workflow)
        {
            if (ModelState.IsValid)
            {
                workflow.InsertBy = loginUser.UserID;
                db.WorkFlows.Add(workflow);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workflow);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workflow.WorkFlowID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/WorkFlow/5
        public HttpResponseMessage DeleteWorkFlow(long id)
        {
            WorkFlow workflow = db.WorkFlows.Find(id);
            if (workflow == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkFlows.Remove(workflow);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workflow);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}