﻿namespace BMS.Models.Resources
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("Resources_AttachFiles")]
    public partial class AttachFile
    {
        [Key]
        public long AttachFileID { get; set; }

        [StringLength(50)]
        public string AttachFileCode { get; set; }

        [StringLength(250)]
        public string AttachFileName { get; set; }

        [StringLength(250)]
        public string AttachFilePath { get; set; }

        public int? DocTypeID { get; set; }

        public long? DocID { get; set; }

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
