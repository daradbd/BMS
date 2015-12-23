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
    public class VoucherTypeController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/VoucherType
        public IEnumerable<VoucherType> GetVoucherTypes()
        {
            return db.VoucherTypes.AsEnumerable();
        }

        // GET api/VoucherType/5
        public VoucherType GetVoucherType(long id)
        {
            VoucherType vouchertype = db.VoucherTypes.Find(id);
            if (vouchertype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return vouchertype;
        }

        // PUT api/VoucherType/5
        public HttpResponseMessage PutVoucherType(long id, VoucherType vouchertype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != vouchertype.VoucherTypeID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(vouchertype).State = EntityState.Modified;

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

        // POST api/VoucherType
        public HttpResponseMessage PostVoucherType(VoucherType vouchertype)
        {
            if (ModelState.IsValid)
            {
                vouchertype.InsertBy = loginUser.UserID;
                db.VoucherTypes.Add(vouchertype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, vouchertype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = vouchertype.VoucherTypeID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/VoucherType/5
        public HttpResponseMessage DeleteVoucherType(long id)
        {
            VoucherType vouchertype = db.VoucherTypes.Find(id);
            if (vouchertype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.VoucherTypes.Remove(vouchertype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, vouchertype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}