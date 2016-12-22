namespace BMS.Models.Production
{
    using BMS.Models.Inventory;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Sales_SalesOrderDescription")]
    public partial class SalesOrderDescription
    {
        [Key]
        public long SalesOrderDescriptionID { get; set; }

        [StringLength(50)]
        public string SalesOrderDescriptionCode { get; set; }

        public long? SalesOrderID { get; set; }

        public long? CustomerID { get; set; }

        public int? SalesSectionID { get; set; }

        public string SalesSectionName { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float? Quantity { get; set; }

        public long? UOMID { get; set; }

        public float? DeliveredQuantity { get; set; }
        public float? BilledQuantity { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal Discount { get; set; }

        public decimal Taxes { get; set; }

        public decimal SubTotal { get; set; }

        public DateTime? ScheduleDate { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

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

        public Product Product { get; set; }

        [ForeignKey("UOMID")]
        public UnitOfMeasure UOM { get; set; }
    }
}
