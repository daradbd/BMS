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
using BMS.Models.Setting.Security;
using BMS.Models;

namespace BMS.Controllers.Setting.Security
{
    public class ModuleController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Module
        public IEnumerable<Module> GetModules()
        {
            return db.Modules.AsEnumerable();
        }

        // GET api/Module/5
        public Module GetModule(long id)
        {
            Module module = db.Modules.Find(id);
            if (module == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return module;
        }

        // PUT api/Module/5
        public HttpResponseMessage PutModule(long id, Module module)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != module.ModuleID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            module.UpdateBy = loginUser.UserID;
            db.Entry(module).State = EntityState.Modified;

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

        // POST api/Module
        public HttpResponseMessage PostModule(Module module)
        {
            if (ModelState.IsValid)
            {
                module.InsertBy = loginUser.UserID;
                db.Modules.Add(module);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, module);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = module.ModuleID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Module/5
        public HttpResponseMessage DeleteModule(long id)
        {
            Module module = db.Modules.Find(id);
            if (module == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Modules.Remove(module);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, module);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}