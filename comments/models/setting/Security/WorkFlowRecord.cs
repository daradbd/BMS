namespace BMS.Models.Setting.Security
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Security_WorkFlowRecords")]
    public partial class WorkFlowRecord
    {
        [Key]
        public long WorkFlowRecordID { get; set; }

        [StringLength(50)]
        public string WorkFlowRecordCode { get; set; }

        public long? FormID { get; set; }

        public long? RecordID { get; set; }

        public DateTime RecordDate { get; set; }

        public long? ProcessID { get; set; }

        public long? UserID { get; set; }

        [StringLength(500)]
        public string Message { get; set; }

        [StringLength(500)]
        public string BackMessage { get; set; }

        public long? CompanyBranchID { get; set; }

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


    }
}
