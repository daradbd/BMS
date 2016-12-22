namespace BMS.Models.Payroll
{
    using BMS.Models.HR;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Payroll_AttendanceAudits")]
    public partial class AttendanceAudit
    {
        [Key]
        public long AttendanceAuditID { get; set; }

        [StringLength(50)]
        public string AttendanceAuditCode { get; set; }

        [StringLength(50)]
        public string AttendanceAuditName { get; set; }

        public string MonthYear { get; set; }

        public long EmployeeID { get; set; }

        public float? DaysWorked { get; set; }

        public float? EarnedLeave { get; set; }

        public float? CasualLeave { get; set; }

        public float? LateAttendance { get; set; } 
        
        public float? OverTime { get; set; }

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

        [ForeignKey("EmployeeID")]
        public virtual Collaborator Employee { get; set; }
    }
}
