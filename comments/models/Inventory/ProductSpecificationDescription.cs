﻿namespace BMS.Models.Inventory
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Inventory_ProductSpecificationDescription")]
    public partial class ProductSpecificationDescription
    {
        [Key]
        public long ProductSpecificationDescriptionID { get; set; }

        [StringLength(50)]
        public string ProductSpecificationDescriptionCode { get; set; }

        public long ProductID { get; set; }

        public long? ProductSpecificationID { get; set; }

        [StringLength(250)]
        public string SpecificationValue { get; set; }

        public bool IsShowInTitle { get; set; }

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

        public virtual ProductSpecification ProductSpecification { get; set; }
    }
}
