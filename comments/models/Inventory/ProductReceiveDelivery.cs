namespace BMS.Models.Inventory
{
    using BMS.Models.HR;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Inventory_ProductReceiveDelivery")]
    public partial class ProductReceiveDelivery
    {
        [Key]
        public long ProductReceiveDeliveryID { get; set; }

        [StringLength(50)]
        public string ProductReceiveDeliveryCode { get; set; }

        public long? CollaboratorID { get; set; }

        public DateTime? Date { get; set; }

        public long? DeliveryPersonID { get; set; }

        public long? ReferenceID { get; set; }

        public int? ReferenceTypeID { get; set; }

        public long? WareHouseID { get; set; }

        public long? ProcesStatusID { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        public bool? IsDelivery { get; set; }

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

        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }
    }
}
