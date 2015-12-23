namespace BMS.Models.Accounting.Configuration.Accounts
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_AccCOAMapping")]
    public partial class AccCOAMapping
    {
        [Key]
        public long COAMappingID { get; set; }

        [StringLength(50)]
        public string COAMappingCode { get; set; }


        public long? AccCOAConfigID { get; set; }

        public long? AccCOAID { get; set; }

        [StringLength(250)]
        public string Prefix { get; set; }

        [StringLength(250)]
        public string Suffix { get; set; }

        public bool? CreateChild { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        public bool? IsDeleted { get; set; }

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

        [StringLength(50)]
        public string DeletePC { get; set; }

        //[StringLength(50)]
        //public virtual string AccCOAConfigName { get; set; }

    }
}
