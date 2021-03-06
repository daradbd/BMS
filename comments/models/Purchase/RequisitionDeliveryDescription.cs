﻿namespace BMS.Models.Purchase
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using BMS.Models.Inventory;

    [Table("Purchase_RequisitionDeliveryDescription")]
    public partial class RequisitionDeliveryDescription
    {
        [Key]
        public long RequisitionDeliveryDescriptionID { get; set; }

        [StringLength(50)]
        public string RequisitionDeliveryDescriptionCode { get; set; }

        public long? RequisitionDeliveryID { get; set; }

        public long? PurchaseRequisitionID { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public float? Quantity { get; set; }

        public long? RequisitionQuantity { get; set; }

        public float? ReceivedQuantity { get; set; }

        public float? StockQuantity { get; set; }

        public long? UOMID { get; set; }

        public DateTime ScheduleDate { get; set; }

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
