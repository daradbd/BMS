namespace BMS.Models.Accounting.Configuration.Banks
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    public partial class BankAccount
    {
        public long BankAccountID { get; set; }

        [StringLength(50)]
        public string BankAccountCode { get; set; }

        [StringLength(250)]
        public string BankAccountName { get; set; }

        [StringLength(150)]
        public string BankAccountNumber { get; set; }

        public long? BankID { get; set; }

        public long? BankBranchID { get; set; }

        public long? BankAccountTypeID { get; set; }

        public long? BankAccountOwnerID { get; set; }

        public int? BankAccountOwnerTypeID { get; set; }

        public long? AssetCOAID { get; set; }
        public long? LiabilityCOAID { get; set; }
        public long? ExpenseCOAID { get; set; }
        public long? IncomeCOAID { get; set; }
        public long? CompanyID { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public int? StatusID { get; set; }

        public bool? IsDeleted { get; set; }

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
