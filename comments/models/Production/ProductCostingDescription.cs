namespace BMS.Models.Production
{
    using BMS.Models.Inventory;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Production_ProductCostingDescription")]
    public partial class ProductCostingDescription
    {
        [Key]
        public long ProductCostingDescriptionID { get; set; }

        [StringLength(50)]
        public string ProductCostingDescriptionCode { get; set; }

        public long? SalesQuotationID { get; set; }

        public long? CustomerID { get; set; }

        public int? SalesSectionID { get; set; }

        public string SalesSectionName { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float? Quantity { get; set; }

        public long? UOMID { get; set; }

        public decimal? NetMaterials { get; set; }

        public decimal? MaterialsWastage { get; set; }

        public decimal? GrossMaterial { get; set; }

        public float? LabourHrs { get; set; }

        public decimal? DirectLabour { get; set; }

        public decimal? PrimeCost { get; set; }

        public decimal? MOH { get; set; }

        public decimal? Tranportation { get; set; } 

        public decimal? FactoryCost { get; set; } 

        public decimal? AdminOH { get; set; } 

        public decimal? CostofProduction { get; set; } 

         public decimal? SAndDOH { get; set; } 

         public decimal? CostofSales { get; set; }

        public decimal? ProfitPersent { get; set; }

        public decimal? Assembly { get; set; } 

        public decimal? SellingPricewithoutVAT { get; set; }

        public decimal? VAT { get; set; } 

        public decimal? SellingPricewithVATPcs { get; set; } 

        public decimal? PromotionCost { get; set; } 

        public decimal? ApprovedPricePcs { get; set; } 

        public decimal? FinalMRP { get; set; } 

        public DateTime? ScheduleDate { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

     //   public int? IsCosting { get; set; }

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

        public Product Product { get; set; }

        [ForeignKey("UOMID")]
        public UnitOfMeasure UOM { get; set; }


    }
}
