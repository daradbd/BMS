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
using BMS.Models.Purchase;
using BMS.Models;

namespace BMS.Controllers.Purchase
{
    public class PurchaseBillController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/PurchaseBill
        public IEnumerable<PurchaseBill> GetPurchaseBills()
        {
            var purchasebills = db.PurchaseBills.Include(p => p.Collaborator).Include(p => p.ProcesStatus).Include(p => p.ProjectSetup);
            return purchasebills.AsEnumerable();
        }

        // GET api/PurchaseBill/5
        public PurchaseBill GetPurchaseBill(long id)
        {
            PurchaseBill purchasebill = db.PurchaseBills.Find(id);
            if (purchasebill == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return purchasebill;
        }

        // PUT api/PurchaseBill/5
        public HttpResponseMessage PutPurchaseBill(long id, PurchaseBill purchasebill)
        {
            LoginUser loginUser = new LoginUser();
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != purchasebill.PurchaseBillID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            if (purchasebill.IsApproved==true)
            {
                long PurchaseCOAID =Convert.ToInt64 (db.AccCOAMappings.Where(a => a.AccCOAConfigID == 22 && a.CompanyID == loginUser.CompanyID).Select(a => a.AccCOAID).SingleOrDefault());
                ControlVoucher controlvoucher = new ControlVoucher();
                var PurchaseOrder = db.PurchaseOrders.Where(o => o.PurchaseOrderID == purchasebill.PurchaseOrderID).SingleOrDefault();
                if(PurchaseOrder!=null)
                {
                    PurchaseCOAID =(long) PurchaseOrder.PurchaseOrderCategory.COAID;
                }


                long SupplierCOAID = (long)db.Collaborators.Where(c => c.CollaboratorID == purchasebill.SupplierID).Select(c => c.SupplierCOAID).FirstOrDefault();

                purchasebill.VoucherNO = controlvoucher.CreateVoucher(PurchaseCOAID, SupplierCOAID, (decimal)purchasebill.GrandTotalApproved, (long)1, (DateTime)purchasebill.Date);
              
            }
           

             
            purchasebill.UpdateBy = loginUser.UserID;

            db.Entry(purchasebill).State = EntityState.Modified;

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

        // POST api/PurchaseBill
        public HttpResponseMessage PostPurchaseBill(PurchaseBill purchasebill)
        {
            if (ModelState.IsValid)
            {
                ControlVoucher controlvoucher = new ControlVoucher();

                //var PurchaseOrder = db.PurchaseOrders.Where(o => o.PurchaseOrderID == purchasebill.PurchaseOrderID).SingleOrDefault();
                //long PurchaseCOAID =(long) PurchaseOrder.PurchaseOrderCategory.COAID;

                //long SupplierCOAID = (long)db.Collaborators.Where(c => c.CollaboratorID == PurchaseOrder.SupplierID).Select(c => c.SupplierCOAID).FirstOrDefault();

                //purchasebill.VoucherNO = controlvoucher.CreateVoucher(PurchaseCOAID, SupplierCOAID, (decimal)purchasebill.GrandTotal, (long)1, (DateTime)purchasebill.Date);
                string CustomCode = "PB-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.PurchaseBills.Where(r => r.PurchaseBillCode.StartsWith(CustomCode)).Select(r => r.PurchaseBillCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string PBCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                purchasebill.PurchaseBillCode = PBCode;
                
                purchasebill.InsertBy = loginUser.UserID;

                db.PurchaseBills.Add(purchasebill);
                db.SaveChanges();
                if(purchasebill.PurchaseDeliveryReceiveID>0)
                {
                    PurchaseDeliveryReceive purchasedeliveryreceive = db.PurchaseDeliveryReceives.Where(r => r.PurchaseDeliveryReceiveID == purchasebill.PurchaseDeliveryReceiveID).SingleOrDefault();
                    purchasedeliveryreceive.IsBilled = true;
                    db.Entry(purchasedeliveryreceive).State = EntityState.Modified;
                    db.SaveChanges();
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, purchasebill);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = purchasebill.PurchaseBillID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PurchaseBill/5
        public HttpResponseMessage DeletePurchaseBill(long id)
        {
            PurchaseBill purchasebill = db.PurchaseBills.Find(id);
            if (purchasebill == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PurchaseBills.Remove(purchasebill);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, purchasebill);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}