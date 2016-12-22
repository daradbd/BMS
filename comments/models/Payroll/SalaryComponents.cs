namespace BMS.Models.Payroll
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Payroll_SalaryComponents")]
    public partial class SalaryComponent
    {
        [Key]
        public long SalaryComponentID { get; set; }

        [StringLength(50)]
        public string SalaryComponentCode { get; set; }

        [StringLength(50)]
        public string SalaryComponentName { get; set; }

        [StringLength(50)]
        public string Abbreviation { get; set; }

        public DateTime? EffectiveDate { get; set; }

        public bool IsCTCBase { get; set; }

        public float? CTCPercentage { get; set; }
        public bool IsPaidComponent { get; set; }

        public long PayTypeID { get; set; }

        public long CalculationTypeID { get; set; }

        public bool IsTaxAble { get; set; }

        public bool IsFixedComponent { get; set; }

        public bool IsShowinPaySlip { get; set; }
        public bool IsAttendanceDepandent { get; set; }
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

        public virtual PayType PayType { get; set; }
        public virtual CalculationType CalculationType { get; set; }
    }
}
