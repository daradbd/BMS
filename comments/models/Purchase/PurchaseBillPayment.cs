namespace BMS.Models.Purchase
{
    using BMS.Models.Accounting.Configuration.Accounts;
    using BMS.Models.HR;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using BMS.Models.Project;
    using System.Data.Entity;

    [Table("Purchase_PurchaseBillPayment")]
    public partial class PurchaseBillPayment
    {
        [Key]
        public long PurchaseBillPaymentID { get; set; }

        [StringLength(50)]
        public string PurchaseBillPaymentCode { get; set; }

        public long? ProjectID { get; set; }

        public long? SupplierID { get; set; }

        public DateTime? Date { get; set; }

        public decimal? PaymentTotal { get; set; }

        public decimal? CreditAmount { get; set; }

        public long? ReceivePersonID { get; set; }

        public long? ReferenceID { get; set; }
        public long? VoucherNO { get; set; }

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

        public long? CreditTo { get; set; }

        public string ChequeNO { get; set; }

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

        [ForeignKey("SupplierID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }

        public virtual PaymentMethod PaymentMethod { get; set; }

        public virtual ProjectSetup ProjectSetup { get; set; }

        [ForeignKey("CreditTo")]
        public virtual AccCOA CreditHead { get; set; }
    }
}
