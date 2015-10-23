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

    [Table("Purchase_MaintainPurchaseQuotation")]
    public partial class MaintainPurchaseQuotation
    {
        [Key]
        public long MaintainPurchaseQuotationID { get; set; }

        [StringLength(50)]
        public string MaintainPurchaseQuotationCode { get; set; }

        public string RequestForQuotationCode { get; set; }
        public long? RequestForQuotationID { get; set; }

        public long? SupplierID { get; set; }

        public DateTime? Date { get; set; }
        public decimal? UnTaxedAmount { get; set; }

        public decimal? DiscountAmount { get; set; }

        public bool? TaxAmount { get; set; }

        public decimal? GrandTotal { get; set; }

        public long? SalesPersonID { get; set; }

        [StringLength(50)]
        public string ReferenceNo { get; set; }

        public long? WareHouseID { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }

        public long? ProjectID { get; set; }

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

        [ForeignKey("SupplierID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }

        public virtual ProjectSetup ProjectSetup { get; set; }


    }
}
