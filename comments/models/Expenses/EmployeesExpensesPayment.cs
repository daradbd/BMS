﻿namespace BMS.Models.Expenses
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Expenses_EmployeesExpensesPayment")]
    public partial class EmployeesExpensesPayment
    {
        public long EmployeesExpensesPaymentID { get; set; }

        [StringLength(50)]
        public string EmployeesExpensesPaymentCode { get; set; }

        public long? EmployeesExpensesID { get; set; }

        public long EmployeeID { get; set; }

        public DateTime PaymentDate { get; set; }
        public decimal PaymentAmount { get; set; }
        public long? PaymentMethod { get; set; }

        public long? CreditTo { get; set; }

        public string CheckNO { get; set; }
        public DateTime ReceiveDate { get; set; }

        public long? ReceiveBy { get; set; }

        [StringLength(550)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        [StringLength(10)]
        public string IsDeleted { get; set; }

        public int? InsertBy { get; set; }

        public DateTime? InsertDate { get; set; }

        [StringLength(50)]
        public string InsertPC { get; set; }

        public int? UpdateBy { get; set; }

        public DateTime? UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdatePC { get; set; }

        public int? DeleteBy { get; set; }

        public DateTime? DeleteDate { get; set; }

        [StringLength(10)]
        public string DeletePC { get; set; }
    }
}