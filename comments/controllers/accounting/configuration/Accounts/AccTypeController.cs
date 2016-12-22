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
    public class AccTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/AccType
        public IEnumerable<AccType> GetAccTypes()
        {
            return db.AccTypes.AsEnumerable();
        }

        // GET api/AccType/5
        public AccType GetAccType(long id)
        {
            AccType acctype = db.AccTypes.Find(id);
            if (acctype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return acctype;
        }

        // PUT api/AccType/5
        public HttpResponseMessage PutAccType(long id, AccType acctype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != acctype.AccTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            acctype.UpdateBy = loginUser.UserID;
            db.Entry(acctype).State = EntityState.Modified;

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

        // POST api/AccType
        public HttpResponseMessage PostAccType(AccType acctype)
        {
            if (ModelState.IsValid)
            {
                acctype.InsertBy = loginUser.UserID;
                db.AccTypes.Add(acctype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, acctype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = acctype.AccTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AccType/5
        public HttpResponseMessage DeleteAccType(long id)
        {
            AccType acctype = db.AccTypes.Find(id);
            if (acctype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AccTypes.Remove(acctype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, acctype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}