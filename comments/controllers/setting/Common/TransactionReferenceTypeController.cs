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
using BMS.Models.Setting.Common;
using BMS.Models;

namespace BMS.Controllers.Setting.Common
{
    public class TransactionReferenceTypeController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/TransactionReferenceType
        public IEnumerable<TransactionReferenceType> GetTransactionReferenceTypes()
        {
            return db.TransactionReferenceTypes.AsEnumerable();
        }

        // GET api/TransactionReferenceType/5
        public TransactionReferenceType GetTransactionReferenceType(long id)
        {
            TransactionReferenceType transactionreferencetype = db.TransactionReferenceTypes.Find(id);
            if (transactionreferencetype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return transactionreferencetype;
        }

        // PUT api/TransactionReferenceType/5
        public HttpResponseMessage PutTransactionReferenceType(long id, TransactionReferenceType transactionreferencetype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != transactionreferencetype.TransactionReferenceTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(transactionreferencetype).State = EntityState.Modified;

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

        // POST api/TransactionReferenceType
        public HttpResponseMessage PostTransactionReferenceType(TransactionReferenceType transactionreferencetype)
        {
            if (ModelState.IsValid)
            {
                db.TransactionReferenceTypes.Add(transactionreferencetype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, transactionreferencetype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = transactionreferencetype.TransactionReferenceTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/TransactionReferenceType/5
        public HttpResponseMessage DeleteTransactionReferenceType(long id)
        {
            TransactionReferenceType transactionreferencetype = db.TransactionReferenceTypes.Find(id);
            if (transactionreferencetype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TransactionReferenceTypes.Remove(transactionreferencetype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, transactionreferencetype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}