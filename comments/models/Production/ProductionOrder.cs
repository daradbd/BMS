namespace BMS.Models.Production
{
    using BMS.Models.HR;
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Production_ProductionOrder")]
    public partial class ProductionOrder
    {
        [Key]
        public long ProductionOrderID { get; set; }

        [StringLength(50)]
        public string ProductionOrderCode { get; set; }

        public string ProductionOrderName { get; set; }

        public long? ReferenceID { get; set; }

        public int? ReferenceTypeID { get; set; }

        public long? ProductionOrderCategoryID { get; set; }
        
        public long? ProjectID { get; set; }

        public DateTime? Date { get; set; }

        public long? OrderPersonID { get; set; }

        public long? OrderReceiveBy { get; set; }

        public long? WorkStationID { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public long? ProcesStatusID { get; set; }
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

    }
}
