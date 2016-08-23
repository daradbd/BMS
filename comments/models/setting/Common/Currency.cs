namespace BMS.Models.Setting.Common
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Setting_Currencys")]
    public partial class Currency
    {
        public long CurrencyID { get; set; }

        [StringLength(50)]
        public string CurrencyCode { get; set; }

        [StringLength(50)]
        public string CurrencyName { get; set; }

        [StringLength(10)]
        public string CurrencySymbol { get; set; }

        [StringLength(50)]
        public string CurrencyDecimalName { get; set; }

        [StringLength(50)]
        public string Position { get; set; }

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
    }
}
