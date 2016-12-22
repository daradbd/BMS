namespace BMS.Models.Accounting.Configuration.Accounts
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_PaymentMethod")]
    public partial class PaymentMethod
    {
        [Key]
        public long PaymentMethodID { get; set; }

        [StringLength(50)]
        public string PaymentMethodCode { get; set; }

        [StringLength(50)]
        public string PaymentMethodName { get; set; }

        public long? AccountingHeadID { get; set; }

        public string RefText { get; set; }

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

      
    }
}
