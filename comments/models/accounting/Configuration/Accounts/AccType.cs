namespace BMS.Models.Accounting.Configuration.Accounts
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_AccType")]
    public partial class AccType
    {
        [Key]
        public long AccTypeID { get; set; }

        [StringLength(50)]
        public string AccTypeCode { get; set; }

        [StringLength(50)]
        public string AccTypeName { get; set; }

        public bool? BalanceType { get; set; }

        [StringLength(10)]
        public string Sequence { get; set; }

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
