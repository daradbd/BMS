namespace BMS.Models.Accounting.Configuration.Accounts
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_AccCOA")]
    public partial class AccCOA
    {
        [Key]
        public long COAID { get; set; }

        [StringLength(50)]
        public string COACode { get; set; }

        [StringLength(50)]
        public string COAName { get; set; }

        public long? ParentCOAID { get; set; }

        public long? AccTypeID { get; set; }

        public bool? BalanceType { get; set; }

        public bool HasChild { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        public bool? IsDeleted { get; set; }

        public int? InsertBy { get; set; }

        public DateTime? InsertDate { get; set; }

        [StringLength(50)]
        public string InsertPC { get; set; }

        public int? UpdateBy { get; set; }

        public DateTime? UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdatePC { get; set; }

        public int? DeleteBy { get; set; }

        public DateTime? DeleteDate { get; set; }

        [StringLength(50)]
        public string DeletePC { get; set; }

        public virtual AccType AccType { get; set; }


        //[ForeignKey("ParentCOAID")]
        //public AccCOA ParentCOA { get; set; }
    }
}
