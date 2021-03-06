﻿using System;
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
namespace BMS.Controllers.Sales
{
    public class SalesBillCategoryController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/SalesBillCategory
        public IEnumerable<SalesBillCategory> GetSalesBillCategories()
        {
            return db.SalesBillCategories.AsEnumerable();
        }

        // GET api/SalesBillCategory/5
        public SalesBillCategory GetSalesBillCategory(long id)
        {
            SalesBillCategory salesbillcategory = db.SalesBillCategories.Find(id);
            if (salesbillcategory == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return salesbillcategory;
        }

        // PUT api/SalesBillCategory/5
        public HttpResponseMessage PutSalesBillCategory(long id, SalesBillCategory salesbillcategory)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != salesbillcategory.SalesBillCategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            salesbillcategory.UpdateBy = loginUser.UserID;
            db.Entry(salesbillcategory).State = EntityState.Modified;

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

        // POST api/SalesBillCategory
        public HttpResponseMessage PostSalesBillCategory(SalesBillCategory salesbillcategory)
        {
            if (ModelState.IsValid)
            {
                //db.SalesBillCategories.Add(salesbillcategory);
                salesbillcategory.InsertBy = loginUser.UserID;
                db.Entry(salesbillcategory).State = salesbillcategory.SalesBillCategoryID == 0 ?
                EntityState.Added : EntityState.Modified;
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, salesbillcategory);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = salesbillcategory.SalesBillCategoryID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/SalesBillCategory/5
        public HttpResponseMessage DeleteSalesBillCategory(long id)
        {
            SalesBillCategory salesbillcategory = db.SalesBillCategories.Find(id);
            if (salesbillcategory == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.SalesBillCategories.Remove(salesbillcategory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, salesbillcategory);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}