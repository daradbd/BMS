namespace BMS.Models.Inventory
{
    using BMS.Models.Inventory;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Inventory_ProductReceiveDeliveryDescription")]
    public partial class ProductReceiveDeliveryDescription
    {
        [Key]
        public long ProductReceiveDeliveryDescriptionID { get; set; }

        [StringLength(50)]
        public string ProductReceiveDeliveryDescriptionCode { get; set; }

        public long? ProductReceiveDeliveryDeliveryID { get; set; }

        public long? CollaboratorID { get; set; }

        public long ProductID { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }
        public int RDQuantity { get; set; }

        public int InOut { get; set; }

        public long? ReferenceID { get; set; }

        public int? ReferenceTypeID { get; set; }

        public DateTime ScheduleDate { get; set; }

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
    }
}
