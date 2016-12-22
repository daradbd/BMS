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
using BMS.Models.Accounting.Transaction;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Accounting.Transaction
{
    public class VoucherListController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/VoucherList
        public IEnumerable<VoucherList> GetVoucherLists(ODataQueryOptions Options)
        {
            //return db.VoucherLists.AsEnumerable();
            return Options.ApplyTo(db.VoucherLists.AsQueryable().Include(v => v.AccCOA).Include(v=>v.AccCOA.AccType)) as IEnumerable<VoucherList>;
        }

        // GET api/VoucherList/5
        public VoucherList GetVoucherList(long id)
        {
            VoucherList voucherlist = db.VoucherLists.Find(id);
            if (voucherlist == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return voucherlist;
        }

        // PUT api/VoucherList/5
        public HttpResponseMessage PutVoucherList(long id, VoucherList voucherlist)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != voucherlist.VoucherID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            voucherlist.UpdateBy = loginUser.UserID;


            db.Entry(voucherlist).State = EntityState.Modified;

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

        // POST api/VoucherList
        public HttpResponseMessage PostVoucherList(VoucherList voucherlist)
        {
            if (ModelState.IsValid)
            {
                voucherlist.InsertBy = loginUser.UserID;
                db.VoucherLists.Add(voucherlist);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, voucherlist);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = voucherlist.VoucherID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/VoucherList/5
        public HttpResponseMessage DeleteVoucherList(long id)
        {
            VoucherList voucherlist = db.VoucherLists.Find(id);
            if (voucherlist == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.VoucherLists.Remove(voucherlist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, voucherlist);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}