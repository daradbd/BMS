namespace BMS.Models.Accounting.Configuration.Banks
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;


    [Table("Accounts_BankLoanTransactions")]
    public partial class BankLoanTransaction
    {
        public long BankLoanTransactionID { get; set; }

        [StringLength(50)]
        public string BankLoanTransactionCode { get; set; }

        public long BankLoanID { get; set; }

        public int TransactionTypeID { get; set; }

        public DateTime TransactionDate { get; set; }

        public decimal? BeginningPrincipal { get; set; }

        public decimal? Interest { get; set; }

        public decimal? Principal { get; set; }

        public decimal? TotalPayment { get; set; }

        public decimal? EndingPrincipal { get; set; }

        public DateTime? ApproveDate { get; set; }

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

        [StringLength(10)]
        public string DeletePC { get; set; }
    }
}