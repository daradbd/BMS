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
using BMS.Models.Purchase;
using BMS.Models;

namespace BMS.Controllers.Purchase
{
    public class MoneyRequisitionRequestController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/MoneyRequisitionRequest
        public IEnumerable<MoneyRequisitionRequest> GetMoneyRequisitionRequests()
        {
            var moneyrequisitionrequests = db.MoneyRequisitionRequests.Include(m => m.Collaborator).Include(m => m.ProcesStatus).Include(m => m.ProjectSetup);
            return moneyrequisitionrequests.AsEnumerable();
        }

        // GET api/MoneyRequisitionRequest/5
        public MoneyRequisitionRequest GetMoneyRequisitionRequest(long id)
        {
            MoneyRequisitionRequest moneyrequisitionrequest = db.MoneyRequisitionRequests.Find(id);
            if (moneyrequisitionrequest == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return moneyrequisitionrequest;
        }

        // PUT api/MoneyRequisitionRequest/5
        public HttpResponseMessage PutMoneyRequisitionRequest(long id, MoneyRequisitionRequest moneyrequisitionrequest)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != moneyrequisitionrequest.MoneyRequisitionRequestID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            moneyrequisitionrequest.UpdateBy = loginUser.UserID;
            db.Entry(moneyrequisitionrequest).State = EntityState.Modified;

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

        // POST api/MoneyRequisitionRequest
        public HttpResponseMessage PostMoneyRequisitionRequest(MoneyRequisitionRequest moneyrequisitionrequest)
        {
            if (ModelState.IsValid)
            {
                //db.MoneyRequisitionRequests.Add(moneyrequisitionrequest);
                moneyrequisitionrequest.InsertBy = loginUser.UserID;
                db.Entry(moneyrequisitionrequest).State = moneyrequisitionrequest.MoneyRequisitionRequestID == 0 ?
                    EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, moneyrequisitionrequest);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = moneyrequisitionrequest.MoneyRequisitionRequestID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/MoneyRequisitionRequest/5
        public HttpResponseMessage DeleteMoneyRequisitionRequest(long id)
        {
            MoneyRequisitionRequest moneyrequisitionrequest = db.MoneyRequisitionRequests.Find(id);
            if (moneyrequisitionrequest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.MoneyRequisitionRequests.Remove(moneyrequisitionrequest);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, moneyrequisitionrequest);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}