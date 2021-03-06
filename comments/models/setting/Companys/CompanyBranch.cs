namespace BMS.Models.Setting.Companys
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using BMS.Models.Setting.Common;
    using BMS.Models.Setting.Companys;

    [Table("Setting_CompanyBranchs")]
    public partial class CompanyBranch
    {
        public long CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        public long? CompanyBranchTypeID { get; set; }

        public long? CompanyBranchCategoryID { get; set; }

        public long? ParentBranchID { get; set; }

        [StringLength(50)]
        public string CompanyBranchCode { get; set; }

        [StringLength(250)]
        public string CompanyBranchName { get; set; }

        [StringLength(50)]
        public string CompanyBranchShortName { get; set; }

        [StringLength(500)]
        public string Street { get; set; }

        [StringLength(50)]
        public string POBox { get; set; }

        [StringLength(50)]
        public string PostalCode { get; set; }

        public long? CountryID { get; set; }

        public long? CityID { get; set; }

        public long? LanguageID { get; set; }

        public long? CurrencyID { get; set; }

        [StringLength(150)]
        public string EmailID { get; set; }

        [StringLength(50)]
        public string Phone { get; set; }

        [StringLength(250)]
        public string Mobile { get; set; }

        [StringLength(150)]
        public string FaxNo { get; set; }

        public int? StatusID { get; set; }

        [StringLength(10)]
        public string IsDeleted { get; set; }

        public long? InsertBy { get; set; }

        public DateTime? InsertDate { get; set; }

        [StringLength(50)]
        public string InsertPC { get; set; }

        public long? UpdateBy { get; set; }

        public DateTime? UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdatePC { get; set; }

        public long? DeleteBy { get; set; }

        public DateTime? DeleteDate { get; set; }

        [StringLength(10)]
        public string DeletePC { get; set; }
        public Company Company { get; set; }
        public CompanyBranchType CompanyBranchType { get; set; }
        public Country Country { get; set; }
        public City City { get; set; }
        public Language Language { get; set; }
        public Currency Currency { get; set; }

        public CompanyBranchCategory CompanyBranchCategory { get; set; }
    }
}
