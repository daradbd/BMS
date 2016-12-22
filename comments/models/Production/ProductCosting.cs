namespace BMS.Models.Production
{
    using BMS.Models.HR;
    using BMS.Models.Project;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Production_ProductCosting")]
    public partial class ProductCosting
    {
        [Key]
        public long ProductCostingID { get; set; }

        [StringLength(50)]
        public string ProductCostingCode { get; set; }

        [StringLength(50)]
        public string ProductCostingName { get; set; }

        public long? ProductCostingCategoryID { get; set; }

        public long? SalesQuotationID { get; set; }

        public decimal TotalAmount { get; set; }

        public long? ProjectID { get; set; }

        public long? CustomerID { get; set; }

        public DateTime? Date { get; set; }

        [StringLength(50)]
        public string ReferenceNo { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }

        public bool IsMRP { get; set; }
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

        public virtual ProjectSetup ProjectSetup { get; set; }


    }
}
