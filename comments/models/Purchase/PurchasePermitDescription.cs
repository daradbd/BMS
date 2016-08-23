namespace BMS.Models.Purchase
{
    using BMS.Models.Inventory;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Purchase_PurchasePermitDescription")]
    public partial class PurchasePermitDescription
    {
        [Key]
        public long PurchasePermitDescriptionID { get; set; }

        [StringLength(50)]
        public string PurchasePermitDescriptionCode { get; set; }

        public long? PurchasePermitID { get; set; }
        public long? PurchaseOrderID { get; set; }

        public long? SupplierID { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float? Quantity { get; set; }

        public long? UOMID { get; set; }

        public DateTime? PreviousDate { get; set; }

        public decimal PreviousPrice { get; set; }
        public decimal ApproxPrice { get; set; }

        public float? ReceivedQuantity { get; set; }

        public decimal UnitPrice { get; set; }

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
