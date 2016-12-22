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
    public class MoneyRequisitionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/MoneyRequisition
        public IEnumerable<MoneyRequisition> GetMoneyRequisitions()
        {
            var moneyrequisitions = db.MoneyRequisitions.Include(m => m.Collaborator).Include(m => m.ProcesStatus).Include(m => m.ProjectSetup);
            return moneyrequisitions.AsEnumerable();
        }

        // GET api/MoneyRequisition/5
        public MoneyRequisition GetMoneyRequisition(long id)
        {
            MoneyRequisition moneyrequisition = db.MoneyRequisitions.Find(id);
            if (moneyrequisition == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return moneyrequisition;
        }

        // PUT api/MoneyRequisition/5
        public HttpResponseMessage PutMoneyRequisition(long id, MoneyRequisition moneyrequisition)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != moneyrequisition.MoneyRequisitionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            moneyrequisition.UpdateBy = loginUser.UserID;
            db.Entry(moneyrequisition).State = EntityState.Modified;

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

        // POST api/MoneyRequisition
        public HttpResponseMessage PostMoneyRequisition(MoneyRequisition moneyrequisition)
        {
            if (ModelState.IsValid)
            {
                var xy = db.MoneyRequisitions.Where(x => x.MoneyRequisitionRequestID == moneyrequisition.MoneyRequisitionRequestID).Select(x => x.MoneyRequisitionRequestID).FirstOrDefault();
                moneyrequisition.MoneyRequisitionID =Convert.ToInt64( xy);
               // db.MoneyRequisitions.Add(moneyrequisition);
                moneyrequisition.InsertBy = loginUser.UserID;
                db.Entry(moneyrequisition).State = moneyrequisition.MoneyRequisitionID == 0 ?
                    EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, moneyrequisition);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = moneyrequisition.MoneyRequisitionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/MoneyRequisition/5
        public HttpResponseMessage DeleteMoneyRequisition(long id)
        {
            MoneyRequisition moneyrequisition = db.MoneyRequisitions.Find(id);
            if (moneyrequisition == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.MoneyRequisitions.Remove(moneyrequisition);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, moneyrequisition);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}