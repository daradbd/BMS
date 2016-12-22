namespace BMS.Models.HR.Leave
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_EmployeeLeaveGroup")]
    public partial class EmployeeLeaveGroup
    {
        public long EmployeeLeaveGroupID { get; set; }

        [StringLength(50)]
        public string EmployeeLeaveGroupCode { get; set; }

        [StringLength(250)]
        public string EmployeeLeaveGroupName { get; set; }

        [StringLength(550)]
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
