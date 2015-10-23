namespace BMS.Models.Setting.Security
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Security_FormLists")]
    public partial class FormList
    {
        [Key]
        public long FormID { get; set; }

        [StringLength(50)]
        public string FormCode { get; set; }

        [StringLength(250)]
        public string FormName { get; set; }

        [StringLength(250)]
        public string state { get; set; }

        [StringLength(250)]
        public string url { get; set; }

        [StringLength(250)]
        public string templateUrl { get; set; }

        [StringLength(250)]
        public string controller { get; set; }

        [StringLength(250)]
        public string MasterTable { get; set; }

        [StringLength(250)]
        public string PKName { get; set; }

        public long? ModuleID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
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
