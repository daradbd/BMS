namespace BMS.Models.Accounting.PayOrders
{
    using BMS.Models.Accounting.Configuration.Banks;
    using BMS.Models.HR;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Accounting_PayOrders")]
    public partial class PayOrder
    {
        [Key]
        public long PayOrderID { get; set; }

        [StringLength(50)]
        public string PayOrderCode { get; set; }

        [StringLength(250)]
        public string PayOrderName { get; set; }

        public long? PayOrderCategoryID { get; set; }

        public long? PayOrderCompanyID { get; set; }

        [StringLength(250)]
        public string ReferenceNo { get; set; }
        public long? SalesPersonID { get; set; }

        public long? PayOrderBankID { get; set; }

        public decimal AgainstAmount { get; set; }

        public decimal PayOrderPercentage { get; set; }

        public long? PaymentMethodID { get; set; }

        public string ChequeNO { get; set; }

        public DateTime Date { get; set; }

        public decimal Amount { get; set; }

        public DateTime? ReturnDate { get; set; }

        public decimal ReturnAmount { get; set; }

        public bool IsReturn { get; set; }


        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        [StringLength(10)]
        public string IsDeleted { get; set; }

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

        [StringLength(10)]
        public string DeletePC { get; set; }

        [ForeignKey("PayOrderCompanyID")]
        public virtual Collaborator PayOrderCompany { get; set; }

        [ForeignKey("SalesPersonID")]
        public virtual Collaborator SalesPerson { get; set; }

        [ForeignKey("PayOrderBankID")]
        public virtual Bank PayOrderBank { get; set; }

    }
}
