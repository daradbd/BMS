using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Data.Objects;
using System.Web.Mvc;
using System.Web.Security;
using BMS.Models.Setting.Companys;
using BMS.Models.Setting.Common;
using BMS.Models.Accounting.Configuration.Banks;
using BMS.Models.Accounting.Configuration.Periods;
using BMS.Models.Accounting.Configuration.Accounts;
using BMS.Models.HR;
using BMS.Models.Inventory;
using BMS.Models.Accounting.Transaction;
using BMS.Models.Purchase;
using BMS.Models.Production;
using BMS.Models.Sales;
using BMS.Models.Project;
using BMS.Models.Setting.Security;
using BMS.Models.Accounting.Configuration.Others;
using BMS.Models.HR.Leave;
using BMS.Models.Expenses;
using BMS.Models.HR.Holiday;
using BMS.Models.Holiday.GeneralHoliday;
using BMS.Models.Resources;
using BMS.Models.Payroll;
using BMS.Models.Accounting.PayOrders;

namespace BMS.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<CompanyCategory> CompanyCategories { get; set; }

        public DbSet<CompanyType> CompanyTypes { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<Currency> Currencies { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<Language> Languages { get; set; }

        public DbSet<CompanyBranchType> CompanyBranchTypes { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<CompanyBranch> CompanyBranches { get; set; }

        public DbSet<BankAccount> BankAccounts { get; set; }

        public DbSet<BankAccountType> BankAccountTypes { get; set; }

        public DbSet<Bank> Banks { get; set; }

        public DbSet<BankBranch> BankBranches { get; set; }

        public DbSet<FiscalYear> FiscalYears { get; set; }

        public DbSet<AccType> AccTypes { get; set; }

        public DbSet<AccCOA> AccCOAs { get; set; }

        public DbSet<VoucherType> VoucherTypes { get; set; }

        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<GLedger> GLedgers { get; set; }

        public DbSet<VoucherList> VoucherLists { get; set; }

        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }

        public DbSet<MaintainPurchaseQuotationDescription> MaintainPurchaseQuotationDescriptions { get; set; }

        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

        public DbSet<PurchaseRequisition> PurchaseRequisitions { get; set; }

        public DbSet<PurchaseRequisitionDescription> PurchaseRequisitionDescriptions { get; set; }

        public DbSet<RequestForQuotation> RequestForQuotations { get; set; }

        public DbSet<RequestForQuotationDescription> RequestForQuotationDescriptions { get; set; }

        public DbSet<SalesOrder> SalesOrders { get; set; }

        public DbSet<SalesOrderDescription> SalesOrderDescriptions { get; set; }


        public DbSet<PurchaseOrderDescription> PurchaseOrderDescriptions { get; set; }

        public DbSet<ProjectSetup> ProjectSetups { get; set; }

        public DbSet<MaintainPurchaseQuotation> MaintainPurchaseQuotations { get; set; }

        public DbSet<FormGroupPermission> FormGroupPermissions { get; set; }

        public DbSet<FormList> FormLists { get; set; }

        public DbSet<FormUserPermission> FormUserPermissions { get; set; }

        public DbSet<WorkFlow> WorkFlows { get; set; }

        public DbSet<WorkFlowConfig> WorkFlowConfigs { get; set; }

        public DbSet<WorkFlowRecord> WorkFlowRecords { get; set; }

        public DbSet<Tax> Taxes { get; set; }

        public DbSet<ProcesStatus> ProcesStatus { get; set; }

        public DbSet<AccCOAConfig> AccCOAConfigs { get; set; }

        public DbSet<AccCOAMapping> AccCOAMappings { get; set; }

        public DbSet<CustomerType> CustomerTypes { get; set; }

        public DbSet<EmployeeType> EmployeeTypes { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<SupplierType> SupplierTypes { get; set; }

        public DbSet<Designation> Designations { get; set; }

        public DbSet<CompanyBranchCategory> CompanyBranchCategories { get; set; }

        public DbSet<EmployeeLeaveType> EmployeeLeaveTypes { get; set; }

        public DbSet<EmployeeLeaveGroup> EmployeeLeaveGroups { get; set; }

        public DbSet<EmployeeLeaveApplication> EmployeeLeaveApplications { get; set; }

        public DbSet<ExpensesType> ExpensesTypes { get; set; }

        public DbSet<EmployeesExpenses> EmployeesExpenses { get; set; }

        public DbSet<EmployeesExpensesDescription> EmployeesExpensesDescriptions { get; set; }

        public DbSet<EmployeesExpensesPayment> EmployeesExpensesPayments { get; set; }

        public DbSet<BillofMaterial> BillofMaterials { get; set; }

        public DbSet<ProductionType> ProductionTypes { get; set; }

        public DbSet<BillofMaterialDescription> BillofMaterialDescriptions { get; set; }

        public DbSet<SalesReceivePayment> SalesReceivePayments { get; set; }

        public DbSet<PurchaseBillPayment> PurchaseBillPayments { get; set; }

        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        public DbSet<RequisitionDelivery> RequisitionDeliveries { get; set; }

        public DbSet<SalesDelivery> SalesDeliveries { get; set; }

        public DbSet<SalesDeliveryDescription> SalesDeliveryDescriptions { get; set; }

        public DbSet<PurchaseDeliveryReceive> PurchaseDeliveryReceives { get; set; }

        public DbSet<PurchaseDeliveryReceiveDescription> PurchaseDeliveryReceiveDescriptions { get; set; }

        public DbSet<ProductReceiveDelivery> ProductReceiveDeliveries { get; set; }

        public DbSet<ProjectSide> ProjectSides { get; set; }

        public DbSet<ProductionOrderDescription> ProductionOrderDescriptions { get; set; }

        public DbSet<ProductionOrder> ProductionOrders { get; set; }

        public DbSet<SalesSection> SalesSections { get; set; }

        public DbSet<SalesQuotation> SalesQuotations { get; set; }

        public DbSet<SalesQuotationDescription> SalesQuotationDescriptions { get; set; }

        public DbSet<SalesBill> SalesBills { get; set; }

        public DbSet<SalesBillDescription> SalesBillDescriptions { get; set; }

        public DbSet<BankAccountOwnerType> BankAccountOwnerTypes { get; set; }

        public DbSet<MoneyRequisitionRequest> MoneyRequisitionRequests { get; set; }

        public DbSet<MoneyRequisition> MoneyRequisitions { get; set; }

        public DbSet<PurchaseBill> PurchaseBills { get; set; }

        public DbSet<PurchaseBillDescription> PurchaseBillDescriptions { get; set; }

        public DbSet<HolidayType> HolidayTypes { get; set; }

        public DbSet<GeneralHoliday> GeneralHolidays { get; set; }

        public DbSet<WeeklyHoliday> WeeklyHolidays { get; set; }

        public DbSet<SalesQuotationCategory> SalesQuotationCategories { get; set; }

        public DbSet<SalesOrderCategory> SalesOrderCategories { get; set; }

        public DbSet<SalesBillCategory> SalesBillCategories { get; set; }

        public DbSet<PurchaseOrderCategory> PurchaseOrderCategories { get; set; }

        public DbSet<SalesDeliveryCategory> SalesDeliveryCategories { get; set; }

        public DbSet<BillofMaterialCategory> BillofMaterialCategories { get; set; }

        public DbSet<ProductionOrderCategory> ProductionOrderCategories { get; set; }

        public DbSet<ProductCostingDescription> ProductCostingDescriptions { get; set; }

        public DbSet<ProductCosting> ProductCostings { get; set; }

        public DbSet<UploadFile> UploadFiles { get; set; }

        public DbSet<RequisitionDeliveryDescription> RequisitionDeliveryDescriptions { get; set; }

        public DbSet<PurchasePermit> PurchasePermits { get; set; }

        public DbSet<PurchasePermitDescription> PurchasePermitDescriptions { get; set; }

        public DbSet<Module> Modules { get; set; }

        public DbSet<ProductBrand> ProductBrands { get; set; }

        public DbSet<ProductSpecification> ProductSpecifications { get; set; }

        public DbSet<ProductSpecificationDescription> ProductSpecificationDescriptions { get; set; }

        public DbSet<AttachFile> AttachFiles { get; set; }

        public DbSet<CalculationType> CalculationTypes { get; set; }

        public DbSet<PayType> PayTypes { get; set; }

        public DbSet<SalaryComponent> SalaryComponents { get; set; }

        public DbSet<SalaryComponentDescription> SalaryComponentDescriptions { get; set; }

        public DbSet<AttendanceAudit> AttendanceAudits { get; set; }

        public DbSet<SalaryComponentConfig> SalaryComponentConfigs { get; set; }

        public DbSet<SalaryComponentMapping> SalaryComponentMappings { get; set; }

        public DbSet<PayrollProcess> PayrollProcesses { get; set; }

        public DbSet<PayrollProcessDescription> PayrollProcessDescriptions { get; set; }

        public DbSet<EmployeeDetails> EmployeeDetails { get; set; }

        public DbSet<TodoList> TodoLists { get; set; }

        public DbSet<PayOrderCategory> PayOrderCategories { get; set; }

        public DbSet<PayOrder> PayOrders { get; set; }

        public DbSet<BankLoan> BankLoans { get; set; }

        public DbSet<BankLoanType> BankLoanTypes { get; set; }

        public DbSet<BankLoanTransaction> BankLoanTransactions { get; set; }

        public DbSet<UOMCategory> UOMCategories { get; set; }

        public DbSet<TransactionReferenceType> TransactionReferenceTypes { get; set; }

        public DbSet<ReferenceTypeMapping> ReferenceTypeMappings { get; set; }

    }

    [Table("UserProfile")]
    public class UserProfile
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string UserName { get; set; }

        public string FirstName { get; set; }
    }

    public class RegisterExternalLoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        public string ExternalLoginData { get; set; }
    }

    public class LocalPasswordModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ExternalLogin
    {
        public string Provider { get; set; }
        public string ProviderDisplayName { get; set; }
        public string ProviderUserId { get; set; }
    }
}
