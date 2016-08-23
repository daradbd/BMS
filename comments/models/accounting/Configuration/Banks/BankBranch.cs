namespace BMS.Models.Accounting.Configuration.Banks
{
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounts_BankBranchs")]
    public partial class BankBranch
    {
        [Key]
        public long BankBranchID { get; set; }

        [StringLength(50)]
        public string BankBranchCode { get; set; }

        [StringLength(250)]
        public string BankBranchName { get; set; }

        public long BankID { get; set; }

        [StringLength(150)]
        public string EmailID { get; set; }

        [StringLength(550)]
        public string Street { get; set; }

        [StringLength(50)]
        public string POBox { get; set; }

        [StringLength(50)]
        public string PostalCode { get; set; } 
        
        [StringLength(250)]
        public string Phone { get; set; }

        [StringLength(250)]
        public string Fax { get; set; }
        public long? CountryID { get; set; }

        public long? CityID { get; set; }

        [StringLength(50)]
        public string SwiftCode { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

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

        public virtual Bank Bank { get; set; }

        public virtual Country Country { get; set; }

        public virtual City City { get; set; }

    }
}
