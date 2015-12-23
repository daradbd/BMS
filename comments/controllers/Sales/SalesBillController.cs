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
using BMS.Models.Production;
using BMS.Models;

namespace BMS.Controllers.Sales
{
    public class SalesBillController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesBill
        public IEnumerable<SalesBill> GetSalesBills()
        {
            var salesbills = db.SalesBills.Include(s => s.Collaborator).Include(s => s.ProcesStatus);
            return salesbills.AsEnumerable();
        }

        // GET api/SalesBill/5
        public SalesBill GetSalesBill(long id)
        {
            SalesBill salesbill = db.SalesBills.Find(id);
            if (salesbill == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesbill;
        }

        // PUT api/SalesBill/5
        public HttpResponseMessage PutSalesBill(long id, SalesBill salesbill)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesbill.SalesBillID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            salesbill.Collaborator = null;
            salesbill.ProcesStatus = null;

            db.Entry(salesbill).State = EntityState.Modified;

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

        // POST api/SalesBill
        public HttpResponseMessage PostSalesBill(SalesBill salesbill)
        {
            if (ModelState.IsValid)
            {
                string CustomCode = "SB-" + DateTime.Now.ToString("yyyyMMdd");
                ControlVoucher controlvoucher = new ControlVoucher();

                long SalesCOAID =(long)db.AccCOAMappings.Where(a => a.AccCOAConfigID == 18 && a.CompanyID == loginUser.CompanyID).Select(a=>a.AccCOAID).FirstOrDefault();

                long CustomerCOAID = (long)db.Collaborators.Where(c => c.CollaboratorID == salesbill.CustomerID).Select(c => c.CustomerCOAID).FirstOrDefault();
                salesbill.VoucherNO = controlvoucher.CreateVoucher(CustomerCOAID, SalesCOAID, (decimal)salesbill.GrandTotal, (long)1, (DateTime)salesbill.Date);

                int? MaxCode = Convert.ToInt32((db.SalesBills.Where(r => r.SalesBillCode.StartsWith(CustomCode)).Select(r => r.SalesBillCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string SBCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                salesbill.SalesBillCode = SBCode;
                salesbill.InsertBy = loginUser.UserID;
                salesbill.Date = DateTime.Now.ToLocalTime();

                db.SalesBills.Add(salesbill);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesbill);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesbill.SalesBillID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesBill/5
        public HttpResponseMessage DeleteSalesBill(long id)
        {
            SalesBill salesbill = db.SalesBills.Find(id);
            if (salesbill == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesBills.Remove(salesbill);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesbill);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}