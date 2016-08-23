namespace BMS.Models.Production
{
    using BMS.Models.HR;
    using BMS.Models.Setting.Common;
    using BMS.Models.Accounting.Configuration.Accounts;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using BMS.Models.Project;

    [Table("Sales_SalesReceivePayment")]
    public partial class SalesReceivePayment
    {
        [Key]
        public long SalesReceivePaymentID { get; set; }

        [StringLength(50)]
        public string SalesReceivePaymentCode { get; set; }

        public long? ProjectID { get; set; }

        public long? CustomerID { get; set; }

        public DateTime? Date { get; set; }

        public decimal? PaymentTotal { get; set; }

        public decimal? CreditAmount { get; set; }

        public long? ReceivePersonID { get; set; }

        public long? ReferenceID { get; set; }


        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string ReferenceNo { get; set; }

        [StringLength(250)]
        public string Memo { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }
        public int? StatusID { get; set; }

        public long? PaymentMethodID { get; set; }

        public long? DepositTo { get; set; }

        public long? VoucherNO{get;set;}

        public string ChequeNO { get; set; }

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

        [ForeignKey("CustomerID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }


        public virtual PaymentMethod PaymentMethod { get; set; }

        public virtual ProjectSetup ProjectSetup { get; set; }

        [ForeignKey("DepositTo")]
        public virtual AccCOA DepositHead { get; set; }
    }
}
