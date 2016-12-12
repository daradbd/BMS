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
using BMS.Models.Inventory;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Inventory
{
    public class UnitOfMeasureController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/UnitOfMeasure
        public IEnumerable<UnitOfMeasure> GetUnitOfMeasures(ODataQueryOptions Options)
        {
            return Options.ApplyTo(db.UnitOfMeasures) as IEnumerable<UnitOfMeasure>;
        }

        // GET api/UnitOfMeasure/5
        public UnitOfMeasure GetUnitOfMeasure(long id)
        {
            UnitOfMeasure unitofmeasure = db.UnitOfMeasures.Find(id);
            if (unitofmeasure == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return unitofmeasure;
        }

        // PUT api/UnitOfMeasure/5
        public HttpResponseMessage PutUnitOfMeasure(long id, UnitOfMeasure unitofmeasure)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != unitofmeasure.UnitOfMeasureID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            unitofmeasure.UpdateBy = loginUser.UserID;
            db.Entry(unitofmeasure).State = EntityState.Modified;

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

        // POST api/UnitOfMeasure
        public HttpResponseMessage PostUnitOfMeasure(UnitOfMeasure unitofmeasure)
        {
            if (ModelState.IsValid)
            {
                unitofmeasure.InsertBy = loginUser.UserID;
                db.UnitOfMeasures.Add(unitofmeasure);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, unitofmeasure);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = unitofmeasure.UnitOfMeasureID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/UnitOfMeasure/5
        public HttpResponseMessage DeleteUnitOfMeasure(long id)
        {
            UnitOfMeasure unitofmeasure = db.UnitOfMeasures.Find(id);
            if (unitofmeasure == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.UnitOfMeasures.Remove(unitofmeasure);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, unitofmeasure);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}