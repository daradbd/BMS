using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using BMS.Filters;
using BMS.Models;
using BMS.Models.HR;
using BMS.Models.Setting.Companys;

namespace BMS.Models
{
    public class LoginUser : Controller
    {
        private UsersContext db = new UsersContext();
        public LoginUser()
        {

            try
            {
                long userID = WebSecurity.CurrentUserId;
                Collaborator collabarator = db.Collaborators.Include(c => c.Designation).Where(u => u.UserID == userID).SingleOrDefault();
                // Designation designation = db.Designations.Where(d => d.DesignationID == collabarator.DesignationID).SingleOrDefault();
                Company company = db.Companies.Where(c => c.CompanyID == collabarator.CompanyID).SingleOrDefault();
                Debug.Assert(collabarator != null, "collabarator != null");
                this.UserID = collabarator.UserID;
                this.UserName = collabarator.Name;
                this.CompanyID = collabarator.CompanyID;
                this.CompanyBranchID = collabarator.CompanyBranchID;
                this.ReportToID = collabarator.ReportToID;
                if (collabarator.DesignationID != null)
                {
                    this.Designation = collabarator.Designation.DesignationName;
                }
                else
                {
                    this.Designation = "";
                }

                this.CompanyName = company.CompanyName;
                //this.CompanyBranchName = collabarator.CompanyBranchName;
                this.EmailID = collabarator.EmailID;
                this.Phone = collabarator.Phone;
                this.IsEmployee = collabarator.IsEmployee;
                this.IsSupplier = collabarator.IsSupplier;
                this.IsSupplier = collabarator.IsSupplier;
                this.IsCustomer = collabarator.IsCustomer;

            }
            catch (Exception e)
            {

               
            }
        }

        public long? UserID { get; set; }
        public string UserName { get; set; }
        public long? CompanyID { get; set; }

        public long? CompanyBranchID { get; set; }

        public string CompanyName { get; set; }

        public string  CompanyBranchName { get; set; }

        public string EmailID { get; set; }

        public string Designation { get; set; }

        public string Phone { get; set; }

        public long? ReportToID { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsSupplier { get; set; }
        public bool IsCustomer { get; set; }
        public string BGColor { get; set; }
        public string BRColor { get; set; }

        public string HVColor { get; set; }
    }
}