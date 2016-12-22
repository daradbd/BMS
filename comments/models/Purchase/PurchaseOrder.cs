namespace BMS.Models.Purchase
{
    using BMS.Models.HR;
    using BMS.Models.Project;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Purchase_PurchaseOrder")]
    public partial class PurchaseOrder
    {
        [Key]
        public long PurchaseOrderID { get; set; }

        [StringLength(50)]
        public string PurchaseOrderCode { get; set; }

        [StringLength(250)]
        public string Subject { get; set; }

        public long? MaintainPurchaseQuotationID { get; set; }

        public long? PurchaseRequisationID { get; set; }

        public long? PurchaseOrderCategoryID { get; set; }

        public long? ProjectID { get; set; }

        public long? SupplierID { get; set; }

        public DateTime? Date { get; set; }
        public decimal? UnTaxedAmount { get; set; }

        public decimal? DiscountAmount { get; set; }

        public decimal? TaxAmount { get; set; }

        public decimal? GrandTotal { get; set; }

        public long? SalesPersonID { get; set; }

        [StringLength(50)]
        public string ReferenceNo { get; set; }

        public long? WareHouseID { get; set; }

        [StringLength(550)]
        public string Message { get; set; }

        [StringLength(550)]
        public string Terms { get; set; }

        [StringLength(550)]
        public string TermsOfPayment { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }

        public int? StatusID { get; set; }

        public bool IsPermited { get; set; }

        public bool IsReceived { get; set; }

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

        public virtual ProjectSetup ProjectSetup { get; set; }
        public virtual PurchaseOrderCategory PurchaseOrderCategory { get; set; }


    }
}
