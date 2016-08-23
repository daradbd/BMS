namespace BMS.Models.HR.Holiday
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_WeeklyHoliday")]
    public partial class WeeklyHoliday
    {
        [Key]
        public long WeeklyHolidayID { get; set; }

        [StringLength(50)]
        public string WeeklyHolidayCode { get; set; }

        [StringLength(50)]
        public string WeeklyHolidayName { get; set; }

        public int Day { get; set; }

        public string Weeks { get; set; }

        public bool? HalfDay { get; set; }

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
