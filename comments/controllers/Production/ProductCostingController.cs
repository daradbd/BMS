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

namespace BMS.Controllers.Production
{
    public class ProductCostingController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/ProductCosting
        public IEnumerable<ProductCosting> GetProductCostings()
        {
            var productcostings = db.ProductCostings.Include(p => p.Collaborator).Include(p => p.ProcesStatus).Include(p => p.ProjectSetup);
            return productcostings.AsEnumerable();
        }

        // GET api/ProductCosting/5
        public ProductCosting GetProductCosting(long id)
        {
            ProductCosting productcosting = db.ProductCostings.Find(id);
            if (productcosting == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return productcosting;
        }

        // PUT api/ProductCosting/5
        public HttpResponseMessage PutProductCosting(long id, ProductCosting productcosting)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != productcosting.ProductCostingID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            productcosting.Collaborator = null;
            productcosting.ProcesStatus = null;
            productcosting.ProjectSetup = null;
            productcosting.UpdateBy = loginUser.UserID;

            db.Entry(productcosting).State = EntityState.Modified;

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

        // POST api/ProductCosting
        public HttpResponseMessage PostProductCosting(ProductCosting productcosting)
        {
            if (ModelState.IsValid)
            {
                var pc = db.ProductCostings.Where(r => r.SalesQuotationID == productcosting.SalesQuotationID).SingleOrDefault();


                if(pc==null)
                {
                     var sq = db.SalesQuotations.Where(s => s.SalesQuotationID == productcosting.SalesQuotationID).SingleOrDefault();

                     string CustomCode = "PCT-" + DateTime.Now.ToString("yyyyMMdd");

                     int? MaxCode = Convert.ToInt32((db.ProductCostings.Where(r => r.ProductCostingCode.StartsWith(CustomCode)).Select(r => r.ProductCostingCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                     string BOMCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                     productcosting.ProductCostingCode = BOMCode;

                     productcosting.SalesQuotationID = sq.SalesQuotationID;
                     productcosting.CustomerID = sq.CustomerID;
                     productcosting.CompanyID = sq.CompanyID;
                     productcosting.InsertBy = loginUser.UserID;

                     db.ProductCostings.Add(productcosting);
                     db.SaveChanges();

                }



                IEnumerable<SalesQuotationDescription> SalesQuotationDescription = db.SalesQuotationDescriptions.Where(r => r.SalesQuotationID == productcosting.SalesQuotationID).AsEnumerable();

                foreach (var item in SalesQuotationDescription.ToList())
                {
                     ProductCostingDescription productCostingDescription = new ProductCostingDescription();

                    ProductCostingDescription PCD = db.ProductCostingDescriptions.Where(a => (a.SalesQuotationID == item.SalesQuotationID) && (a.ProductID == item.ProductID) && (a.SalesSectionID == item.SalesSectionID) && (a.SalesSectionName == item.SalesSectionName)).SingleOrDefault();
                    if (PCD != null)
                    {
                        productCostingDescription = PCD;
                    
                    }

                    productCostingDescription.CustomerID = item.CustomerID;
                    productCostingDescription.SalesQuotationID = item.SalesQuotationID;
                    productCostingDescription.Description = item.Description;
                    productCostingDescription.UOMID = item.UOMID;
                    productCostingDescription.ProductID = item.ProductID;
                    productCostingDescription.SalesSectionID = item.SalesSectionID;
                    productCostingDescription.SalesSectionName = item.SalesSectionName;
                    productCostingDescription.Quantity = item.Quantity;
                    productCostingDescription.NetMaterials = item.CostPrice;
                    db.Entry(productCostingDescription).State = productCostingDescription.ProductCostingDescriptionID == 0 ?
                    EntityState.Added : EntityState.Modified;
                    db.SaveChanges();
                    
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, productcosting);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = productcosting.ProductCostingID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ProductCosting/5
        public HttpResponseMessage DeleteProductCosting(long id)
        {
            ProductCosting productcosting = db.ProductCostings.Find(id);
            if (productcosting == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ProductCostings.Remove(productcosting);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, productcosting);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}