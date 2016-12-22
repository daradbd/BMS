namespace BMS.Models.Payroll
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Payroll_SalaryComponentConfigs")]
    public partial class SalaryComponentConfig
    {
        [Key]
        public long SalaryComponentConfigID { get; set; }

        [StringLength(50)]
        public string SalaryComponentConfigCode { get; set; }

        [StringLength(50)]
        public string SalaryComponentConfigName { get; set; }

        [StringLength(10)]
        public string Sequence { get; set; }
        
        public bool IsActive { get; set; }
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
