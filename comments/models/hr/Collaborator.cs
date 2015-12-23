namespace BMS.Models.HR
{
    using BMS.Models.Setting.Common;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    [Table("HR_Collaborator")]
    public partial class Collaborator
    {
        [Key]
        public long CollaboratorID { get; set; }

        [StringLength(50)]
        public string CollaboratorCode { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(550)]
        public string Image { get; set; }

        [StringLength(150)]
        public string NID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? BOD { get; set; }

        [StringLength(500)]
        public string Street { get; set; }

        [StringLength(50)]
        public string POBox { get; set; }

        [StringLength(50)]
        public string PostalCode { get; set; }

        public long? CountryID { get; set; }

        public long? CityID { get; set; }

        public long? LanguageID { get; set; }

        public long? CurrencyID { get; set; }

        [StringLength(150)]
        public string EmailID { get; set; }

        [StringLength(50)]
        public string Phone { get; set; }

        [StringLength(250)]
        public string Mobile { get; set; }

        [StringLength(150)]
        public string FaxNo { get; set; }

        [StringLength(550)]
        public string Website { get; set; }

        [StringLength(150)]
        public string FBID { get; set; }

        [StringLength(550)]
        public string FBPage { get; set; }

        [StringLength(150)]
        public string TINNO { get; set; }

        public bool? IsCompany { get; set; }

        public bool IsCustomer { get; set; }

        public long? CustomerTypeID { get; set; }

        public long? CustomerCOAID { get; set; }

        public bool IsSupplier { get; set; }

        public long? SupplierTypeID { get; set; }

        public long? SupplierCOAID { get; set; }

        public bool IsEmployee { get; set; }
        public long? ReportToID { get; set; }
        public long? DepartmentID { get; set; }
        public long? DesignationID { get; set; }

        public long? EmployeeCOAID { get; set; }

        public long? ParentID { get; set; }

        public long? UserID { get; set; }

        public long? CompanyBranchID { get; set; }

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
        public Country Country { get; set; }


        public City City { get; set; }


        public Language Language { get; set; }


        public Currency Currency { get; set; }

        public CustomerType CustomerType { get; set; }

        public SupplierType SupplierType { get; set; }

        public Department Department { get; set; }

        public Designation Designation { get; set; }

        [ForeignKey("ReportToID")]
        public Collaborator ReportTo { get; set; }
    }
}
