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
    public class BillofMaterialCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/BillofMaterialCategory
        public IEnumerable<BillofMaterialCategory> GetBillofMaterialCategories()
        {
            return db.BillofMaterialCategories.AsEnumerable();
        }

        // GET api/BillofMaterialCategory/5
        public BillofMaterialCategory GetBillofMaterialCategory(long id)
        {
            BillofMaterialCategory billofmaterialcategory = db.BillofMaterialCategories.Find(id);
            if (billofmaterialcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return billofmaterialcategory;
        }

        // PUT api/BillofMaterialCategory/5
        public HttpResponseMessage PutBillofMaterialCategory(long id, BillofMaterialCategory billofmaterialcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != billofmaterialcategory.BillofMaterialCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(billofmaterialcategory).State = EntityState.Modified;

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

        // POST api/BillofMaterialCategory
        public HttpResponseMessage PostBillofMaterialCategory(BillofMaterialCategory billofmaterialcategory)
        {
            if (ModelState.IsValid)
            {
                billofmaterialcategory.InsertBy = loginUser.UserID;
                db.BillofMaterialCategories.Add(billofmaterialcategory);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, billofmaterialcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = billofmaterialcategory.BillofMaterialCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BillofMaterialCategory/5
        public HttpResponseMessage DeleteBillofMaterialCategory(long id)
        {
            BillofMaterialCategory billofmaterialcategory = db.BillofMaterialCategories.Find(id);
            if (billofmaterialcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BillofMaterialCategories.Remove(billofmaterialcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, billofmaterialcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}