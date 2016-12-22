namespace BMS.Models.Setting.Security
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Security_FormGroupPermissions")]
    public partial class FormGroupPermission
    {
        [Key]
        public long FormGroupPermissionID { get; set; }

        [StringLength(50)]
        public string FormGroupPermissionCode { get; set; }

        public long? FormID { get; set; }

        public bool? View { get; set; }

        public bool? Insert { get; set; }

        public bool? Update { get; set; }

        public bool? Delete { get; set; }

        public long? CompanyBranchID { get; set; }

        public long? CompanyID { get; set; }

        [StringLength(250)]
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


    }
}
