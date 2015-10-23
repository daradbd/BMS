namespace BMS.Models.Holiday.GeneralHoliday
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_GeneralHoliday")]
    public partial class GeneralHoliday
    {
        [Key]
        public long GeneralHolidayID { get; set; }

        [StringLength(50)]
        public string GeneralHolidayCode { get; set; }

        [StringLength(50)]
        public string GeneralHolidayName { get; set; }

        public int HolidayType { get; set; }

        public DateTime Date { get; set; }

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

        [StringLength(50)]
        public string DeletePC { get; set; }
    }
}
