namespace BMS.Models.Purchase
{
    using BMS.Models.Inventory;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Purchase_PurchaseOrderDescription")]
    public partial class PurchaseOrderDescription
    {
        [Key]
        public long PurchaseOrderDescriptionID { get; set; }

        [StringLength(50)]
        public string PurchaseOrderDescriptionCode { get; set; }

        public long? PurchaseOrderID { get; set; }

        public long? SupplierID { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float? Quantity { get; set; }

        public long? UOMID { get; set; }

        public float? ReceivedQuantity { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal ApproxPrice { get; set; }

        public decimal Taxes { get; set; }
        public decimal Discount { get; set; }
        public int? DiscountType { get; set; }

        public decimal SubTotal { get; set; }

        public DateTime? ScheduleDate { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

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

        public Product Product { get; set; }

        [ForeignKey("UOMID")]
        public UnitOfMeasure UOM { get; set; }
    }
}
