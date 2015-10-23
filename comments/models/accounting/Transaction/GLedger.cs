namespace BMS.Models.Accounting.Transaction
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_GLedger")]
    public partial class GLedger
    {
        [Key]
        public long GLedgerID { get; set; }

        [StringLength(50)]
        public string GLedgerCode { get; set; }

        public long? COAID { get; set; }

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
    }
}
