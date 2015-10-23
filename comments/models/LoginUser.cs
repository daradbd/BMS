using System;
using System.Collections.Generic;
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

namespace BMS.Models
{
    public class LoginUser : Controller
    {
        private UsersContext db = new UsersContext();
        public LoginUser()
        {
            
            long userID = WebSecurity.CurrentUserId;
            Collaborator collabarator = db.Collaborators.Where(u => u.UserID == userID).SingleOrDefault();
            this.UserID = collabarator.UserID;
            this.UserName = collabarator.Name;
            this.CompanyID = collabarator.CompanyID;
            this.CompanyBranchID = collabarator.CompanyBranchID;
            this.ReportToID = collabarator.ReportToID;
            //this.CompanyName = collabarator.CompanyName;
            //this.CompanyBranchName = collabarator.CompanyBranchName;
            this.EmailID = collabarator.EmailID;
            this.Phone = collabarator.Phone;
            this.IsEmployee = collabarator.IsEmployee;
            this.IsSupplier = collabarator.IsSupplier;
            this.IsSupplier = collabarator.IsSupplier;
            this.IsCustomer = collabarator.IsCustomer;

        }

        public long? UserID { get; set; }
        public string UserName { get; set; }
        public long? CompanyID { get; set; }

        public long? CompanyBranchID { get; set; }

        public string CompanyName { get; set; }

        public string  CompanyBranchName { get; set; }

        public string EmailID { get; set; }

        public string Phone { get; set; }

        public long? ReportToID { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsSupplier { get; set; }
        public bool IsCustomer { get; set; }
    }
}