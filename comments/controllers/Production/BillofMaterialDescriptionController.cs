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
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Production
{
    public class BillofMaterialDescriptionController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/BillofMaterialDescription
        public IEnumerable<BillofMaterialDescription> GetBillofMaterialDescriptions(ODataQueryOptions Options)
        {
            //var billofmaterialdescriptions = db.BillofMaterialDescriptions.Include(b => b.Collaborator).Include(b => b.ProcesStatus).Include(b => b.ProjectSetup);
            //return billofmaterialdescriptions.AsEnumerable();
            return Options.ApplyTo(db.BillofMaterialDescriptions.AsQueryable().Include(b=>b.Collaborator).Include(b=>b.ProcesStatus).Include(b=>b.ProjectSetup).Include(b=>b.RawMaterial)) as IEnumerable<BillofMaterialDescription>;
        }

        // GET api/BillofMaterialDescription/5
        public BillofMaterialDescription GetBillofMaterialDescription(long id)
        {
            BillofMaterialDescription billofmaterialdescription = db.BillofMaterialDescriptions.Find(id);
            if (billofmaterialdescription == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return billofmaterialdescription;
        }

        // PUT api/BillofMaterialDescription/5
        public HttpResponseMessage PutBillofMaterialDescription(long id, BillofMaterialDescription billofmaterialdescription)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

                billofmaterialdescription.Collaborator = null;
                billofmaterialdescription.RawMaterial = null;
                billofmaterialdescription.ProjectSetup = null;
                billofmaterialdescription.ProcesStatus = null;

            if (id != billofmaterialdescription.BillofMaterialDescriptionID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            billofmaterialdescription.UpdateBy = loginUser.UserID;


            db.Entry(billofmaterialdescription).State = EntityState.Modified;

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

        // POST api/BillofMaterialDescription
        public HttpResponseMessage PostBillofMaterialDescription(BillofMaterialDescription billofmaterialdescription)
        {
            SalesQuotationDescription salesquotationdescription = db.SalesQuotationDescriptions.Where(q => (q.SalesQuotationID == billofmaterialdescription.SalesQuotationID) && (q.SalesSectionID == billofmaterialdescription.SalesSectionID) && (q.ProductID == billofmaterialdescription.ProductID)).FirstOrDefault();
            if (ModelState.IsValid)
            {
               // db.BillofMaterialDescriptions.Add(billofmaterialdescription);
                db.Entry(billofmaterialdescription).State = billofmaterialdescription.BillofMaterialDescriptionID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();
               // var CostPrice = (db.BillofMaterialDescriptions.Where(r => (r.BillofMaterialDescriptionID == billofmaterialdescription.BillofMaterialDescriptionID) && (r.ProductID == billofmaterialdescription.ProductID)).Select(r => (r.RawMaterialQuantity)));
                var CostPrice = (db.BillofMaterialDescriptions.Where(r => (r.BillofMaterialID == billofmaterialdescription.BillofMaterialID) && (r.SalesSectionID == billofmaterialdescription.SalesSectionID) && (r.ProductID == billofmaterialdescription.ProductID) && (r.IsBOM == true)).Select(r => ((r.RawMaterialQuantity * (r.RawMaterialUniteRate + r.OtherCost)) / r.ProductQuantity))).ToList().Sum();
                salesquotationdescription.CostPrice = Convert.ToDecimal(CostPrice);
                salesquotationdescription.InsertBy = loginUser.UserID;

                db.Entry(salesquotationdescription).State = EntityState.Modified;
                db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, billofmaterialdescription);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = billofmaterialdescription.BillofMaterialDescriptionID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BillofMaterialDescription/5
        public HttpResponseMessage DeleteBillofMaterialDescription(long id)
        {
            BillofMaterialDescription billofmaterialdescription = db.BillofMaterialDescriptions.Find(id);
            if (billofmaterialdescription == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BillofMaterialDescriptions.Remove(billofmaterialdescription);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, billofmaterialdescription);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}