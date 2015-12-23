namespace BMS.Models.Project
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Project_ProjectSetup")]
    public partial class ProjectSetup
    {
        [Key]
        public long ProjectID { get; set; }

        [StringLength(50)]
        public string ProjectCode { get; set; }

        [StringLength(250)]
        public string ProjectName { get; set; }

        public long? CustomerID { get; set; }

        public long? ProjectManagerID { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public long? ParentProjectID { get; set; }

        public long? ProjectSideID { get; set; }

        public long? SideSupervisorID { get; set; }

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
