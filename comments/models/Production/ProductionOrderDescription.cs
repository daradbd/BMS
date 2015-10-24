namespace BMS.Models.Production
{
    using BMS.Models.HR;
    using BMS.Models.Inventory;
    using BMS.Models.Project;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Production_ProductionOrderDescription")]
    public partial class ProductionOrderDescription
    {
        [Key]
        public long ProductionOrderDescriptionID { get; set; }

        [StringLength(50)]
        public string ProductionOrderDescriptionCode { get; set; }

        public long? ProductionOrderID { get; set; }

        public long? OrderPersonID { get; set; }

        public long? CustomerID { get; set; }

        public int? SalesSectionID { get; set; }

        public string SalesSectionName { get; set; }

        public long? ProjectID { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float Quantity { get; set; }

        public long? UOMID { get; set; }

        public float? POrderQuantity { get; set; }

        public float? DeliveryQty { get; set; }

        public DateTime? LastDeliveryDate { get; set; }

        public long? ReferenceID { get; set; }

        public int? ReferenceTypeID { get; set; }//1 of SalesOrder

        public DateTime? OfferDate { get; set; }

        public DateTime? ScheduleDate { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        public bool? IsClaim { get; set; }

        public long? ClaimParentID { get; set; }

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

        public virtual ProjectSetup ProjectSetup { get; set; }

        public Product Product { get; set; }

        [ForeignKey("UOMID")]
        public UnitOfMeasure UOM { get; set; }
    }
}
