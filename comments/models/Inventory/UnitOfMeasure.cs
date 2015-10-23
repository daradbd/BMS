namespace BMS.Models.Inventory
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Inventory_UnitOfMeasure")]
    public partial class UnitOfMeasure
    {
        [Key]
        public long UnitOfMeasureID { get; set; }

        [StringLength(50)]
        public string UnitOfMeasureCode { get; set; }

        [StringLength(250)]
        public string UnitOfMeasureName { get; set; }

        public long? ParentUOMID { get; set; }

        public long? Sequenct { get; set; }

        
        public decimal? ConversionValue { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        [StringLength(10)]
        public string IsDeleted { get; set; }

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

        [StringLength(10)]
        public string DeletePC { get; set; }
    }
}
