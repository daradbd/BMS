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
using BMS.Models.Inventory;
using BMS.Models;
using System.Web.Http.OData.Query;

namespace BMS.Controllers.Inventory
{
    public class ProductController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Product
        public IEnumerable<Product> GetProducts(ODataQueryOptions Options)
        {

            var products = Options.ApplyTo(db.Products) as IEnumerable<Product>;
            var productDetails = from p in db.Products select new
            {
                ProductID=p.ProductID,
                ProductCode=p.ProductCode,
                ProductName=p.ProductName,
                ProductSpecificationDescription=db.ProductSpecificationDescriptions.Where(s=>s.ProductID==p.ProductID).Select(s=>s.SpecificationValue)

            };

            var result2 = (from a in productDetails.ToList()
                           select new
                           {
                               ProductID = a.ProductID,
                               ProductCode = a.ProductCode,
                               ProductName = a.ProductName,
                               ProductSpecificationDescription = String.Join(", ", a.ProductSpecificationDescription.ToArray())
                           });
            return products.AsEnumerable();
        }

        // GET api/Product/5
        public Product GetProduct(long id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return product;
        }

        // PUT api/Product/5
        public HttpResponseMessage PutProduct(long id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != product.ProductID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            product.UpdateBy = loginUser.UserID;
            db.Entry(product).State = EntityState.Modified;

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

        // POST api/Product
        public HttpResponseMessage PostProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                product.InsertBy = loginUser.UserID;
                db.Products.Add(product);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, product);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = product.ProductID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Product/5
        public HttpResponseMessage DeleteProduct(long id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Products.Remove(product);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, product);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}