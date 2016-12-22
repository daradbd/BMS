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
    public class CustomerTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/CustomerType
        public IEnumerable<CustomerType> GetCustomerTypes()
        {
            return db.CustomerTypes.AsEnumerable();
        }

        // GET api/CustomerType/5
        public CustomerType GetCustomerType(long id)
        {
            CustomerType customertype = db.CustomerTypes.Find(id);
            if (customertype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return customertype;
        }

        // PUT api/CustomerType/5
        public HttpResponseMessage PutCustomerType(long id, CustomerType customertype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != customertype.CustomerTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            customertype.UpdateBy = loginUser.UserID;

            db.Entry(customertype).State = EntityState.Modified;

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

        // POST api/CustomerType
        public HttpResponseMessage PostCustomerType(CustomerType customertype)
        {
            if (ModelState.IsValid)
            {
                customertype.InsertBy = loginUser.UserID;
                db.CustomerTypes.Add(customertype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, customertype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = customertype.CustomerTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/CustomerType/5
        public HttpResponseMessage DeleteCustomerType(long id)
        {
            CustomerType customertype = db.CustomerTypes.Find(id);
            if (customertype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.CustomerTypes.Remove(customertype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, customertype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}