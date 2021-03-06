namespace BMS.Models.Inventory
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Inventory_Product")]
    public partial class Product
    {
        [Key]
        public long ProductID { get; set; }

        [StringLength(50)]
        public string ProductCode { get; set; }

        [StringLength(250)]
        public string ProductName { get; set; }

        public long? ProductCategoryID { get; set; }

        public long? ProductBrandID { get; set; }

        public bool IsRawmaterial { get; set; }

        public decimal? SalePrice { get; set; }

        public decimal? CostPrice { get; set; } 
        public decimal? MinPrice { get; set; } 
        public decimal? MaxPrice { get; set; }

        public long? UOMID { get; set; }

        [StringLength(350)]
        public string Description { get; set; }

        [StringLength(550)]
        public string SLNO { get; set; }
        public float? CurrentStock { get; set; }
        public float? OpeningStock { get; set; }

        public float? ReorderLevel { get; set; }
        
        [StringLength(450)]
        public string Image { get; set; }

        public DateTime? LastPurchaseDate { get; set; }

        public long? CountryID { get; set; }

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

        public virtual ProductCategory ProductCategory { get; set; }
        public virtual ProductBrand ProductBrand { get; set; }

        [ForeignKey("UOMID")]
        public virtual UnitOfMeasure UOM { get; set; }


    }
}
