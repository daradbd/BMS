namespace BMS.Models.HR
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_TodoList")]
    public partial class TodoList
    {
        [Key]
        public long TodoListID { get; set; }

        [StringLength(50)]
        public string TodoListCode { get; set; }

        [StringLength(50)]
        public string TaskName { get; set; }

        public DateTime? DueDateTime { get; set; }
        public long? CompanyID { get; set; }

        public long? AssignTo { get; set; }

        [StringLength(250)]
        public string Remarks { get; set; }

        public DateTime? ComplitedDateTime { get; set; }

        public bool IsDone { get; set; }

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
