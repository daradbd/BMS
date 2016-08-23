namespace BMS.Models.Expenses
{
    using BMS.Models.Accounting.Configuration.Accounts;
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
        public long? PaymentMethodID { get; set; }

        public long? CreditTo { get; set; }

        public string ChequeNO { get; set; }

        public string Memo { get; set; }
        public DateTime? ReceiveDate { get; set; }

        public long? ReceiveBy { get; set; }

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
        public virtual PaymentMethod PaymentMethod { get; set; }

        [ForeignKey("CreditTo")]
        public virtual AccCOA CreditHead { get; set; }
    }
}