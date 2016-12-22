namespace BMS.Models.Production
{
    using BMS.Models.HR;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Sales_SalesOrder")]
    public partial class SalesOrder
    {
        [Key]
        public long SalesOrderID { get; set; }

        [StringLength(50)]
        public string SalesOrderCode { get; set; }

        [StringLength(250)]
        public string Subject { get; set; }

        public long? SalesQuotationID { get; set; }

        [StringLength(50)]
        public string SalesQuotationCode { get; set; }

        public long? SalesOrderCategoryID { get; set; }

        public long? ProjectID { get; set; }

        public long? CustomerID { get; set; }

        public DateTime? Date { get; set; }
        public decimal? UnTaxedAmount { get; set; }

        public decimal? DiscountAmount { get; set; }

        public decimal? TaxAmount { get; set; }

        public decimal? VatAmount { get; set; }

        public decimal? Shipping { get; set; }

        public decimal? GrandTotal { get; set; }

        public long? SalesPersonID { get; set; }

        public long? ReferenceID { get; set; }

        [StringLength(150)]
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

        [ForeignKey("CustomerID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }
    }
}
