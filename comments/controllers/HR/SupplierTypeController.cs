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
using BMS.Models.HR;
using BMS.Models;

namespace BMS.Controllers.HR
{
    public class SupplierTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/SupplierType
        public IEnumerable<SupplierType> GetSupplierTypes()
        {
            return db.SupplierTypes.AsEnumerable();
        }

        // GET api/SupplierType/5
        public SupplierType GetSupplierType(long id)
        {
            SupplierType suppliertype = db.SupplierTypes.Find(id);
            if (suppliertype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return suppliertype;
        }

        // PUT api/SupplierType/5
        public HttpResponseMessage PutSupplierType(long id, SupplierType suppliertype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != suppliertype.SupplierTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(suppliertype).State = EntityState.Modified;

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

        // POST api/SupplierType
        public HttpResponseMessage PostSupplierType(SupplierType suppliertype)
        {
            if (ModelState.IsValid)
            {
                db.SupplierTypes.Add(suppliertype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, suppliertype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = suppliertype.SupplierTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SupplierType/5
        public HttpResponseMessage DeleteSupplierType(long id)
        {
            SupplierType suppliertype = db.SupplierTypes.Find(id);
            if (suppliertype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SupplierTypes.Remove(suppliertype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, suppliertype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}