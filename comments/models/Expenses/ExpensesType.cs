namespace BMS.Models.Expenses
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Expenses_ExpensesType")]
    public partial class ExpensesType
    {
        public long ExpensesTypeID { get; set; }

        [StringLength(50)]
        public string ExpensesTypeCode { get; set; }

        [StringLength(250)]
        public string ExpensesTypeName { get; set; }

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
