﻿namespace BMS.Models.Purchase
{
    using BMS.Models.HR;
    using BMS.Models.Project;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Purchase_RequisitionDelivery")]
    public partial class RequisitionDelivery
    {
        [Key]
        public long RequisitionDeliveryID { get; set; }

        [StringLength(50)]
        public string RequisitionDeliveryCode { get; set; }

        [StringLength(50)]
        public string RequisitionCode { get; set; }

        public long? PurchaseRequisitionID { get; set; }
        public long? EmployeeID { get; set; }

        public long? PurchaseTypeID { get; set; }

        public DateTime? Date { get; set; }

        public long? ProjectID { get; set; }
        public long? ReferenceID { get; set; }
        public long? WorkPlantID { get; set; }

        public long? WareHouseID { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }

        public int? StatusID { get; set; }

        public bool IsReceived { get; set; }

        public bool IsDeleted { get; set; }

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

        [ForeignKey("EmployeeID")]
        public virtual Collaborator Collaborator { get; set; }

        public virtual ProcesStatus ProcesStatus { get; set; }

        public virtual ProjectSetup ProjectSetup { get; set; }


    }
}
