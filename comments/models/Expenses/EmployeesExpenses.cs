namespace BMS.Models.Expenses
{
    using BMS.Models.HR;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Expenses_EmployeesExpenses")]
    public partial class EmployeesExpenses
    {
        public long EmployeesExpensesID { get; set; }

        [StringLength(50)]
        public string EmployeesExpensesCode { get; set; }

        [StringLength(250)]
        public string EmployeesExpensesName { get; set; }

        public long EmployeeID { get; set; }

        public DateTime? SubmitDate { get; set; }
       

        public decimal? ApplyAmount { get; set; }
        public decimal? ApproveAmount { get; set; }
        public DateTime? DisbursementDate { get; set; }
        public decimal? PaymentAmount { get; set; }
        public decimal? DueAmount { get; set; }

        [StringLength(550)]
        public string Remarks { get; set; }

        public bool IsApproved { get; set; }

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

        [ForeignKey("EmployeeID")]
        public virtual Collaborator Employee { get; set; }
    }
}
