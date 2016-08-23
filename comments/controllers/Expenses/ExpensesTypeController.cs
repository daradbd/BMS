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
using BMS.Models.Expenses;
using BMS.Models;

namespace BMS.Controllers.Expenses
{
    public class ExpensesTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ExpensesType
        public IEnumerable<ExpensesType> GetExpensesTypes()
        {
            return db.ExpensesTypes.AsEnumerable();
        }

        // GET api/ExpensesType/5
        public ExpensesType GetExpensesType(long id)
        {
            ExpensesType expensestype = db.ExpensesTypes.Find(id);
            if (expensestype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return expensestype;
        }

        // PUT api/ExpensesType/5
        public HttpResponseMessage PutExpensesType(long id, ExpensesType expensestype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != expensestype.ExpensesTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            expensestype.UpdateBy = loginUser.UserID;

            db.Entry(expensestype).State = EntityState.Modified;

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

        // POST api/ExpensesType
        public HttpResponseMessage PostExpensesType(ExpensesType expensestype)
        {
            if (ModelState.IsValid)
            {
                db.ExpensesTypes.Add(expensestype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, expensestype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = expensestype.ExpensesTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ExpensesType/5
        public HttpResponseMessage DeleteExpensesType(long id)
        {
            ExpensesType expensestype = db.ExpensesTypes.Find(id);
            if (expensestype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ExpensesTypes.Remove(expensestype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, expensestype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}