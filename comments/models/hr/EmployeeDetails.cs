namespace BMS.Models.HR
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_EmployeeDetails")]
    public partial class EmployeeDetails
    {
        [Key]
        public long EmployeeDetailsID { get; set; }

        [StringLength(50)]
        public string EmployeeDetailsCode { get; set; }

        public long EmployeeID { get; set; }

        [StringLength(50)]
        public string FathersName { get; set; }

        [StringLength(50)]
        public string MothersName { get; set; }

        public DateTime? DateofBirth { get; set; }

        public DateTime? JoinDate { get; set; }

        public DateTime? ResignDate { get; set; }

        public int GenderID { get; set; }

        public int MaritalStatusID { get; set; }

        public string BloodGroup { get; set; }

        [StringLength(50)]
        public string CardNumber { get; set; }

        [StringLength(50)]
        public string Nationality { get; set; }

        [StringLength(50)]
        public string Religion { get; set; }

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
