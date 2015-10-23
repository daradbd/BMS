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
    public class AccCOAMappingController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/AccCOAMapping
        public HttpResponseMessage GetAccCOAMappings()
        {
           
            var result = from x in db.AccCOAConfigs
                        join y in db.AccCOAMappings on x.AccCOAConfigID equals y.AccCOAConfigID into CoaMapping
                        from xy in CoaMapping.DefaultIfEmpty()
                        select new 
                        {
                            COAMappingID =(long?) xy.COAMappingID,
                            COAMappingCode = xy.COAMappingCode,
                            AccCOAConfigID = x.AccCOAConfigID,
                            AccCOAID = xy.AccCOAID,
                            Prefix = xy.Prefix,
                            Suffix = xy.Suffix,
                            CreateChild = xy.CreateChild,
                            AccCOAConfigName = x.AccCOAConfigName
                        };
            //return db.AccCOAMappings.AsEnumerable();
            return Request.CreateResponse(HttpStatusCode.OK, result.ToList());
        }

        // GET api/AccCOAMapping/5
        public AccCOAMapping GetAccCOAMapping(long id)
        {
            AccCOAMapping acccoamapping = db.AccCOAMappings.Find(id);
            if (acccoamapping == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return acccoamapping;
        }

        // PUT api/AccCOAMapping/5
        public HttpResponseMessage PutAccCOAMapping(long id, AccCOAMapping acccoamapping)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != acccoamapping.COAMappingID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(acccoamapping).State = EntityState.Modified;

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

        // POST api/AccCOAMapping
        public HttpResponseMessage PostAccCOAMapping(AccCOAMapping acccoamapping)
        {
            if (ModelState.IsValid)
            {
                db.Entry(acccoamapping).State = acccoamapping.COAMappingID == 0 ?
                  EntityState.Added : EntityState.Modified;
                //db.AccCOAMappings.Add(acccoamapping);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, acccoamapping);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = acccoamapping.COAMappingID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/AccCOAMapping/5
        public HttpResponseMessage DeleteAccCOAMapping(long id)
        {
            AccCOAMapping acccoamapping = db.AccCOAMappings.Find(id);
            if (acccoamapping == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.AccCOAMappings.Remove(acccoamapping);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, acccoamapping);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}