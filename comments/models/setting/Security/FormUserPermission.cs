namespace BMS.Models.Setting.Security
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Security_FormUserPermissions")]
    public partial class FormUserPermission
    {
        [Key]
        public long FormUserPermissionID { get; set; }

        [StringLength(50)]
        public string FormUserPermissionCode { get; set; }
        public long? UserID { get; set; }
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
