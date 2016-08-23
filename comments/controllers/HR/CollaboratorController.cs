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
using BMS.Models.HR;
using BMS.Models;
using System.Web.Http.OData.Query;
using WebMatrix.WebData;


namespace BMS.Controllers.HR
{

    public class CollaboratorController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/Collaborator
        public IEnumerable<Collaborator> GetCollaborators(ODataQueryOptions options)
        {
            //var rr = Options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City).Include(l => l.Language).Include(c => c.Currency).Include(ct => ct.CustomerType).Include(st => st.SupplierType)) as IEnumerable<Collaborator>;
            //return db.Collaborators.AsEnumerable();
            var coll = options.ApplyTo(db.Collaborators.AsQueryable()) as IEnumerable<Collaborator>;

           // coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(l => l.Language).Include(c => c.Currency)) as IEnumerable<Collaborator>;
            if (options.Filter.RawValue.IndexOf("IsEmployee eq true")>=0)
            {
                coll = options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City).Include(d => d.Department).Include(d => d.CompanyBranch)) as IEnumerable<Collaborator>;
            }

            if (options.Filter.RawValue.IndexOf("IsCustomer eq true")>=0)
            {
                coll = options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City).Include(ct => ct.CustomerType).Include(d => d.SalesAssociate).Include(d => d.SalesAssociate.Department).Include(d => d.SalesAssociate.CompanyBranch)) as IEnumerable<Collaborator>;
                //coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(d=>d.SalesAssociate.Department).Include(d=>d.SalesAssociate.CompanyBranch)) as IEnumerable<Collaborator>;
            }
            if (options.Filter.RawValue.IndexOf("ParentID eq") >= 0)
            {
                coll = options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.City).Include(d => d.Designation)) as IEnumerable<Collaborator>;
                //coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(d=>d.SalesAssociate.Department).Include(d=>d.SalesAssociate.CompanyBranch)) as IEnumerable<Collaborator>;
            }

            if (options.Filter.RawValue.IndexOf("IsSupplier eq true")>=0)
            {
                coll = options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City).Include(st => st.SupplierType)) as IEnumerable<Collaborator>;
            }
           

            
            
            
            //foreach (var p in context.Products.Where(p => p.Category != null)) ;

            //coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City)) as IEnumerable<Collaborator>;
            //coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City)) as IEnumerable<Collaborator>;
            //coll = Options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City)) as IEnumerable<Collaborator>;

            return coll;

            //return Options.ApplyTo(db.Collaborators.AsQueryable().Include(c => c.Country).Include(c => c.City).Include(l => l.Language).Include(c => c.Currency).Include(ct => ct.CustomerType).Include(st => st.SupplierType).Include(d => d.Department).Include(d => d.CompanyBranch)) as IEnumerable<Collaborator>;
        }

        // GET api/Collaborator/5
        public Collaborator GetCollaborator(long id)
        {
            //Collaborator collaborator = db.Collaborators.Find(id);

           // Collaborator collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(c => c.Country).Include(c => c.City).Include(l => l.Language).Include(c => c.Currency).Include(ct => ct.CustomerType).Include(st => st.SupplierType).Include(d => d.Department).Include(d => d.Designation).Include(d => d.ReportTo).SingleOrDefault();

           Collaborator collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(c => c.Country).Include(c => c.City).SingleOrDefault();
            collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(l => l.Language).Include(c => c.Currency).SingleOrDefault();
            collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(st => st.SupplierType).Include(d => d.Department).SingleOrDefault();
            collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(d => d.Designation).Include(s=>s.SalesAssociate).SingleOrDefault();
            collaborator = db.Collaborators.Where(i => i.CollaboratorID == id).Include(ct => ct.CustomerType).SingleOrDefault();


            if (collaborator == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
           // collaborator.Language = db.Languages.Where(l => l.LanguageID == collaborator.LanguageID).FirstOrDefault();
            //collaborator.Currency=db.Currencies.Where(c=>c.CurrencyID==collaborator.CurrencyID).FirstOrDefault();
            //collaborator.Country=db.Countries.Where(c=>c.CountryID==collaborator.CountryID).FirstOrDefault();
           // collaborator.City = db.Cities.Where(c => c.CityID == collaborator.CityID).FirstOrDefault();
            //collaborator.ReportTo = db.Collaborators.Where(c => c.CollaboratorID == collaborator.ReportToID).FirstOrDefault();
           // collaborator.Department = db.Departments.Where(c => c.DepartmentID == collaborator.DepartmentID).FirstOrDefault();
           // collaborator.Designation = db.Designations.Where(c => c.DesignationID == collaborator.DesignationID).FirstOrDefault();
            //collaborator.CustomerType = db.CustomerTypes.Where(c => c.CustomerTypeID == collaborator.CustomerTypeID).FirstOrDefault();
            //collaborator.SupplierType = db.SupplierTypes.Where(c => c.SupplierTypeID == collaborator.SupplierTypeID).FirstOrDefault();
            return collaborator;
        }

        // PUT api/Collaborator/5
        public HttpResponseMessage PutCollaborator(long id, Collaborator collaborator)
        {
            collaborator.Language = null;
            collaborator.Currency=null;
            collaborator.Country=null;
            collaborator.City = null;
            //collaborator.ReportTo = null;
            collaborator.Department = null;
            collaborator.Designation = null;
            collaborator.CustomerType = null;
            collaborator.SupplierType = null;
            collaborator.UpdateBy = loginUser.UserID;
            collaborator.UpdateDate = DateTime.Now.Date;
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != collaborator.CollaboratorID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(collaborator).State = EntityState.Modified;

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

        // POST api/Collaborator
        public HttpResponseMessage PostCollaborator(Collaborator collaborator)
        {
            if (ModelState.IsValid)
            {
                if (WebSecurity.GetUserId(collaborator.EmailID)>0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    //RegisterModel RM=new RegisterModel();
                    //RM.UserName=collaborator.Name;
                    //RM.Password="123456";
                    ControlCOA controlCOA = new ControlCOA();
                    

                    string CollaboratorCode = "";
                    //long COAID = 0;
                    if (collaborator.IsCustomer == true)
                    {
                        string prefix = db.CustomerTypes.Where(ct => ct.CustomerTypeID == collaborator.CustomerTypeID).Select(s => s.CustomerTypeShortName).SingleOrDefault();
                        CollaboratorCode = prefix+"-";
                        collaborator.CustomerCOAID = controlCOA.CreateCOA(collaborator.Title + " " + collaborator.Name, 5);
                    }
                    else if (collaborator.IsSupplier == true)
                    {
                        string prefix = db.SupplierTypes.Where(st => st.SupplierTypeID == collaborator.SupplierTypeID).Select(s => s.SupplierTypeShortName).SingleOrDefault();
                        CollaboratorCode = prefix+"-";
                        collaborator.SupplierCOAID = controlCOA.CreateCOA(collaborator.Title + " " + collaborator.Name, 10);
                    }
                    else if (collaborator.IsEmployee == true)
                    {
                        string prefix = db.Departments.Where(st => st.DepartmentID == collaborator.DepartmentID).Select(s => s.DepartmentCode).SingleOrDefault();
                        CollaboratorCode = prefix; //"EMP-" + DateTime.Now.ToString("yyyyMMdd");
                        collaborator.EmployeeCOAID = controlCOA.CreateCOA(collaborator.Title + " " + collaborator.Name, 11);
                    }

                    if (CollaboratorCode == "")
                    {
                        CollaboratorCode = "CP-";
                    }

                    int? MaxCode = Convert.ToInt32((db.Collaborators.Where(r => r.CollaboratorCode.StartsWith(CollaboratorCode)).Select(r => r.CollaboratorCode.Substring(CollaboratorCode.Length, 3)).ToList()).Max());
                    string CBCode = CollaboratorCode + ((MaxCode + 1).ToString()).PadLeft(3, '0'); 
                    collaborator.CollaboratorCode = CBCode;

                    WebSecurity.CreateUserAndAccount(collaborator.EmailID, "123456");
                    //AccountController acc = new AccountController();
                    //acc.Register(RM);
                    if (collaborator.IsEmployee == true)
                    {
                        collaborator.UserID = WebSecurity.GetUserId(collaborator.EmailID);
                    }
                    //WebSecurity.InitializeDatabaseConnection();
                    //WebSecurity.CreateUserAndAccount(, );
                    collaborator.SalesAssociateID = loginUser.UserID;
                    collaborator.InsertBy = loginUser.UserID;
                    collaborator.InsertDate = DateTime.Now.Date;
                    db.Collaborators.Add(collaborator);
                    db.SaveChanges();

                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, collaborator);
                    response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = collaborator.CollaboratorID }));
                    return response;
                }
                
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Collaborator/5
        public HttpResponseMessage DeleteCollaborator(long id)
        {
            Collaborator collaborator = db.Collaborators.Find(id);
            if (collaborator == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Collaborators.Remove(collaborator);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, collaborator);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}