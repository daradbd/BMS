﻿namespace BMS.Models.Payroll
{
    using BMS.Models.HR;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;


    [Table("Payroll_PayrollProcessDescriptions")]
    public partial class PayrollProcessDescription
    {
        [Key]
        public long PayrollProcessDescriptionID { get; set; }

        [StringLength(50)]
        public string PayrollProcessDescriptionCode { get; set; }

        public long? SalaryComponentID { get; set; }

        public long? EmployeeID { get; set; }

        public Decimal ComponentValue { get; set; }

        public long PayrollProcessID { get; set; }

        public string Formula { get; set; }

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

        public virtual SalaryComponent SalaryComponent { get; set; }

        [ForeignKey("EmployeeID")]
        public Collaborator Employee { get; set; }
    }
}
