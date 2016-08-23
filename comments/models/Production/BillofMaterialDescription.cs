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

    [Table("Production_BillofMaterialDescription")]
    public partial class BillofMaterialDescription
    {
        [Key]
        public long BillofMaterialDescriptionID { get; set; }

        [StringLength(50)]
        public string BillofMaterialDescriptionCode { get; set; }

        public long? BillofMaterialID { get; set; }

        public int? SalesSectionID { get; set; }

        public string SalesSectionName { get; set; }

        public long? ProductID { get; set; }

        public int? Height  { get; set; }

        public int? Length { get; set; }

        public int? Width { get; set; }


        public long? ProductQuantity { get; set; }

        public long? ProductionTypeID { get; set; }

        public long RawMaterialsID { get; set; }

        public decimal RawMaterialQuantity { get; set; }

        public float? Wastage { get; set; }

        public decimal? MaterialIncludingWastage { get; set; }

        public decimal RawMaterialUniteRate { get; set; }

        public decimal OtherCost { get; set; }

        public decimal TotalCost { get; set; }

        public bool isFactory { get; set; }

        public long? SalesQuotationID { get; set; }

        public long? UOMID { get; set; }

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

        public bool? IsBOM { get; set; }

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

        [ForeignKey("RawMaterialsID")]
        public virtual  Product RawMaterial { get; set; }

        [ForeignKey("UOMID")]
        public virtual UnitOfMeasure UOM { get; set; }


    }
}
