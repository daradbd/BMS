﻿namespace BMS.Models.Expenses
{
    using BMS.Models.Project;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Expenses_EmployeesExpensesDescription")]
    public partial class EmployeesExpensesDescription
    {
        public long EmployeesExpensesDescriptionID { get; set; }

        [StringLength(50)]
        public string EmployeesExpensesDescriptionCode { get; set; }

        [StringLength(250)]
        public string EmployeesExpensesDescriptionName { get; set; }

        public long? EmployeesExpensesID { get; set; }

        public long? ExpensesTypeID { get; set; }

        public long? ProjectID { get; set; }
        public decimal Quantity { get; set; }
        public decimal ExpenseRate { get; set; }
        public decimal ExpensesAmount { get; set; }

        public decimal ApproveAmount { get; set; }

        public long EmployeeID { get; set; }

        public DateTime ExpenseDate { get; set; }

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

        [ForeignKey("ExpensesTypeID")]
        public virtual ExpensesType ExpensesType { get; set; }

        [ForeignKey("ProjectID")]
        public virtual ProjectSetup Project { get; set; }
    }
}
