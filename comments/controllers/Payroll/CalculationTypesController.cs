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
using BMS.Models.Payroll;
using BMS.Models;

namespace BMS.Controllers.Payroll
{
    public class CalculationTypesController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/CalculationTypes
        public IEnumerable<CalculationType> GetCalculationTypes()
        {
            return db.CalculationTypes.AsEnumerable();
        }

        // GET api/CalculationTypes/5
        public CalculationType GetCalculationType(long id)
        {
            CalculationType calculationtype = db.CalculationTypes.Find(id);
            if (calculationtype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return calculationtype;
        }

        // PUT api/CalculationTypes/5
        public HttpResponseMessage PutCalculationType(long id, CalculationType calculationtype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != calculationtype.CalculationTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(calculationtype).State = EntityState.Modified;

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

        // POST api/CalculationTypes
        public HttpResponseMessage PostCalculationType(CalculationType calculationtype)
        {
            if (ModelState.IsValid)
            {
                db.CalculationTypes.Add(calculationtype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, calculationtype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = calculationtype.CalculationTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CalculationTypes/5
        public HttpResponseMessage DeleteCalculationType(long id)
        {
            CalculationType calculationtype = db.CalculationTypes.Find(id);
            if (calculationtype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CalculationTypes.Remove(calculationtype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, calculationtype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}