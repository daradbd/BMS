namespace BMS.Models.Accounting.Transaction
{
    using BMS.Models.Accounting.Configuration.Accounts;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_VoucherList")]
    public partial class VoucherList
    {
        [Key]
        public long VoucherID { get; set; }

        [StringLength(50)]
        public string VoucherCode { get; set; }

       
        public long? COAID { get; set; }

        [StringLength(50)]
        public string ReferenceNo { get; set; }
        
        public DateTime? TranDate { get; set; }

        public decimal? Amount { get; set; }

        public bool? DrCr { get; set; }

        public long? VoucherNo { get; set; }

        public long? VoucherTypeID { get; set; }

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

        public virtual AccCOA AccCOA { get; set; }
    }
}
