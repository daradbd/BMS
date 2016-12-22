namespace BMS.Models.Payroll
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Payroll_PayrollProcesses")]
    public partial class PayrollProcess
    {
        [Key]
        public long PayrollProcessID { get; set; }

        [StringLength(50)]
        public string PayrollProcessCode { get; set; }

        [StringLength(50)]
        public string PayrollProcessName { get; set; }

        public string LatePolicy { get; set; }

        [StringLength(50)]
        public string MonthYear { get; set; }

        public DateTime? Date { get; set; }


        public bool IsPosted { get; set; }

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
    }
}
