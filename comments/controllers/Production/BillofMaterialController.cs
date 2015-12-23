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
    public class BillofMaterialController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/BillofMaterial
        public IEnumerable<BillofMaterial> GetBillofMaterials(ODataQueryOptions Options)
        {
            //var billofmaterials = db.BillofMaterials.Include(b => b.Collaborator).Include(b => b.ProcesStatus).Include(b => b.ProjectSetup);
            //return billofmaterials.AsEnumerable();
            return Options.ApplyTo(db.BillofMaterials.AsQueryable().Include(b => b.Collaborator).Include(b => b.ProcesStatus).Include(b => b.ProjectSetup)) as IEnumerable<BillofMaterial>;
        }

        // GET api/BillofMaterial/5
        public BillofMaterial GetBillofMaterial(long id)
        {
            BillofMaterial billofmaterial = db.BillofMaterials.Find(id);
            if (billofmaterial == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return billofmaterial;
        }

        // PUT api/BillofMaterial/5
        public HttpResponseMessage PutBillofMaterial(long id, BillofMaterial billofmaterial)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != billofmaterial.BillofMaterialID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(billofmaterial).State = EntityState.Modified;

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

        // POST api/BillofMaterial
        public HttpResponseMessage PostBillofMaterial(BillofMaterial billofmaterial)
        {
            if (ModelState.IsValid)
            {

                string CustomCode = "BOM-" + DateTime.Now.ToString("yyyyMMdd");

                int? MaxCode = Convert.ToInt32((db.BillofMaterials.Where(r => r.BillofMaterialCode.StartsWith(CustomCode)).Select(r => r.BillofMaterialCode.Substring(CustomCode.Length, 4)).ToList()).Max());
                string BOMCode = CustomCode + ((MaxCode + 1).ToString()).PadLeft(4, '0');
                billofmaterial.BillofMaterialCode = BOMCode;
                billofmaterial.InsertBy = loginUser.UserID;
                db.BillofMaterials.Add(billofmaterial);
                db.SaveChanges();
                
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, billofmaterial);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = billofmaterial.BillofMaterialID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/BillofMaterial/5
        public HttpResponseMessage DeleteBillofMaterial(long id)
        {
            BillofMaterial billofmaterial = db.BillofMaterials.Find(id);
            if (billofmaterial == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.BillofMaterials.Remove(billofmaterial);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, billofmaterial);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}