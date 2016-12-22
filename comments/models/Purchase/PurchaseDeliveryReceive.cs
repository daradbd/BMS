namespace BMS.Models.Purchase
{
    using BMS.Models.HR;
    using BMS.Models.Project;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Purchase_PurchaseDeliveryReceive")]
    public partial class PurchaseDeliveryReceive
    {
        [Key]
        public long PurchaseDeliveryReceiveID { get; set; }

        [StringLength(50)]
        public string PurchaseDeliveryReceiveCode { get; set; }

        public long? PurchaseRequisationID { get; set; }

        public long? PurchaseOrderID { get; set; }

        public string PurchaseOrderCode { get; set; }
        public long? ProjectID { get; set; }

        public long? SupplierID { get; set; }

        public DateTime? Date { get; set; }

        public long? PurchasePersonID { get; set; }

        [StringLength(50)]
        public string ReferenceNo { get; set; }

        public long? WareHouseID { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }

        public bool IsBilled { get; set; }

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

        [ForeignKey("SupplierID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }

        public virtual ProjectSetup ProjectSetup { get; set; }


    }
}
