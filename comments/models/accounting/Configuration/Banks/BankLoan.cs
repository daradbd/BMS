namespace BMS.Models.Accounting.Configuration.Banks
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;


    [Table("Accounts_BankLoans")]
    public partial class BankLoan
    {
        public long BankLoanID { get; set; }

        [StringLength(50)]
        public string BankLoanCode { get; set; }

        [StringLength(250)]
        public string BankLoanName { get; set; }

        [StringLength(150)]
        public string LoanAccountNumber { get; set; }

        public long? BankID { get; set; }

        public long? BankBranchID { get; set; }

        public long? BankLoanTypeID { get; set; }

        public decimal? TotalAmount { get; set; }

        public float? InterestRate { get; set; }

        public float? Terms { get; set; }

        public int? TermsUOMID { get; set; }

        public int? PaymentPeriodUOMID { get; set; }

        public DateTime? PaymentStartDate { get; set; }
        public long? AssetCOAID { get; set; }
        public long? LiabilityCOAID { get; set; }
        public long? ExpenseCOAID { get; set; }
        public long? IncomeCOAID { get; set; }
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

        public virtual Bank Bank { get; set; }

        public virtual BankBranch BankBranch { get; set; }

        public virtual BankLoanType BankLoanType { get; set; }
    }
}