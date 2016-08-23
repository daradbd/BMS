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
using BMS.Models.Accounting.Configuration.Accounts;
using BMS.Models;

namespace BMS.Controllers.Accounting.Configuration.Accounts
{
    public class AccCOAConfigController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();
        // GET api/AccCOAConfig
        public IEnumerable<AccCOAConfig> GetAccCOAConfigs()
        {
            return db.AccCOAConfigs.AsEnumerable();
        }

        // GET api/AccCOAConfig/5
        public AccCOAConfig GetAccCOAConfig(long id)
        {
            AccCOAConfig acccoaconfig = db.AccCOAConfigs.Find(id);
            if (acccoaconfig == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return acccoaconfig;
        }

        // PUT api/AccCOAConfig/5
        public HttpResponseMessage PutAccCOAConfig(long id, AccCOAConfig acccoaconfig)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != acccoaconfig.AccCOAConfigID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            acccoaconfig.UpdateBy = loginUser.UserID;
            db.Entry(acccoaconfig).State = EntityState.Modified;

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

        // POST api/AccCOAConfig
        public HttpResponseMessage PostAccCOAConfig(AccCOAConfig acccoaconfig)
        {
            if (ModelState.IsValid)
            {
                acccoaconfig.InsertBy = loginUser.UserID;
                db.AccCOAConfigs.Add(acccoaconfig);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, acccoaconfig);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = acccoaconfig.AccCOAConfigID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AccCOAConfig/5
        public HttpResponseMessage DeleteAccCOAConfig(long id)
        {
            AccCOAConfig acccoaconfig = db.AccCOAConfigs.Find(id);
            if (acccoaconfig == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AccCOAConfigs.Remove(acccoaconfig);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, acccoaconfig);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}