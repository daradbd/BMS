using System.Web;
using System.Web.Optimization;

namespace BMS
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Content/js/jquery/TweenLite.js",
                        "~/Content/js/jquery/login.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/login/css").Include(
                "~/Content/css/animate.css",
                "~/Content/login.css"));

            //bundles.Add(new StyleBundle("~/Style/css").Include(
            //"~/Content/css/metisMenu.css",
            //"~/Content/css/sidebar.css",
            //"~/Content/css/toastr.css",
            //"~/Content/css/style.css",
            // "~/Content/css/treeview.css",
            //"~/Content/css/animate.css",
            //"~/Content/css/responsive.css",
            //"~/Content/css/jqxsummer.css",
            //"~/Content/css/printStyle.css"));


            bundles.Add(new StyleBundle("~/Style/css").Include(
            "~/Content/css/toastr.css",
             "~/Content/css/treeview.css",
            "~/Content/css/animate.css",
            "~/Content/css/printStyle.css",
            "~/Content/css/style.css"));


            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));



            bundles.Add(new ScriptBundle("~/Library/Scripts").Include(
                        "~/Content/js/jquery/jquery.js",
                        "~/Content/js/angularjs/angular.js",
                        "~/Content/js/angularjs/angular-route.js",
                        "~/Content/js/angularjs/angular-resource.js",
                        "~/Content/js/angularjs/ui-utils.js",
                        "~/Content/js/angularjs/angular-ui-router.js",
                        "~/Content/js/angularjs/angular-animate.js",
                        "~/Content/js/angularjs/toastr.js",
                        "~/Content/js/angularjs/ui-bootstrap-tpls-0.11.0.js"));

            bundles.Add(new ScriptBundle("~/Application/Scripts").Include(
                        "~/app/app.js",
                        "~/app/Authentication/UserAuthentication/companyManagement.UserAuthentication.js",
                        "~/app/Authentication/UserAuthentication/userAuthenticationService.js"));

            bundles.Add(new ScriptBundle("~/Controllers/Scripts").Include(
                       "~/app/Authentication/UserAuthentication/userAuthentication.js",
                       "~/app/TestModule/commentListCtrl.js",
                       "~/app/setting/company/companyCategory/companyCategoryCtrl.js",
                       "~/app/setting/company/companyBranchCategory/CompanyBranchCategoryCtrl.js",
                       "~/app/setting/company/companyType/companyTypeCtrl.js",
                       "~/app/setting/common/country/countryCtrl.js",
                       "~/app/setting/common/city/cityCtrl.js",
                       "~/app/setting/common/currency/currencyCtrl.js",
                       "~/app/setting/common/language/languageCtrl.js",
                       "~/app/setting/common/menu/menuCtrl.js",
                       "~/app/setting/company/companyBranchType/companyBranchTypeCtrl.js",
                       "~/app/setting/company/companyName/company.js",
                       "~/app/setting/company/companyBranch/companyBranchCtrl.js",
                       "~/app/Accounting/Configuration/Accounts/accTypeCtrl.js",
                       "~/app/Accounting/Configuration/Accounts/voucherTypeCtrl.js",
                       "~/app/Accounting/Configuration/Banks/bankCtrl.js",
                       "~/app/Accounting/Configuration/Banks/bankAccountTypeCtrl.js",
                       "~/app/Accounting/Configuration/Banks/bankAccountOwnerTypeCtrl.js",

                       "~/app/Accounting/Configuration/Banks/bankAccountCtrl.js",
                       "~/app/Accounting/Configuration/Periods/fiscalYearCtrl.js",
                       "~/app/Accounting/Configuration/Banks/bankBranchCtrl.js",
                       "~/app/Accounting/Configuration/Accounts/accCOACtrl.js",
                       "~/app/Accounting/Configuration/Accounts/accCOAConfigCtrl.js",
                       "~/app/Accounting/Configuration/Accounts/AccCOAMappingCtrl.js",
                       "~/app/Accounting/Configuration/Accounts/paymentMethodCtrl.js",
                       "~/app/Accounting/Transaction/gLedgerCtrl.js",
                       "~/app/Accounting/Transaction/voucherListCtrl.js",
                       "~/app/Accounting/Transaction/Report/trialBalanceCtrl.js",
                       "~/app/Accounting/Transaction/Report/ledgerSheetCtrl.js",

                       "~/app/Inventory/Product/productCategoryCtrl.js",
                       "~/app/Inventory/Product/productCtrl.js",
                       "~/app/Inventory/Product/unitOfMeasureCtrl.js",
                       "~/app/Inventory/Product/productReceiveDeliveryCtrl.js",

                       "~/app/HR/collaboratorCtrl.js",
                       "~/app/HR/customerCtrl.js",
                       "~/app/HR/customerModalCtrl.js",
                       "~/app/HR/supplierCtrl.js",
                       "~/app/HR/employeeCtrl.js",
                       "~/app/HR/customerTypeCtrl.js",
                       "~/app/HR/supplierTypeCtrl.js",
                       "~/app/HR/employeeTypeCtrl.js",
                       "~/app/HR/departmentCtrl.js",
                       "~/app/HR/designationCtrl.js",
                       "~/app/Purchase/MoneyRequisitionRequestCtrl.js",
                       "~/app/Purchase/MoneyRequisitionCtrl.js",
                       "~/app/Purchase/purchaseRequisitionCtrl.js",
                       "~/app/Purchase/requestForQuotationCtrl.js",
                       "~/app/Purchase/maintainPurchaseQuotationCtrl.js",
                       "~/app/Purchase/purchaseOrderCtrl.js",
                        "~/app/Purchase/requisitionDeliveryCtrl.js",
                        "~/app/Purchase/purchaseDeliveryReceiveCtrl.js",
                        "~/app/Purchase/purchaseOrderCategoryCtrl.js",

                        "~/app/Resources/uploadFileCtrl.js",

                       "~/app/Sales/salesQuotationCtrl.js",
                       "~/app/Sales/salesDeliveryCtrl.js",
                       "~/app/Sales/salesBillCtrl.js",
                       "~/app/Sales/salesQuotationCategoryCtrl.js",
                       "~/app/Sales/salesOrderCategoryCtrl.js",
                       "~/app/Sales/salesDeliveryCategoryCtrl.js",
                       "~/app/Sales/salesBillCategoryCtrl.js",



                       "~/app/HR/Leave/employeeLeaveTypeCtrl.js",
                       "~/app/HR/Leave/employeeLeaveGroupCtrl.js",
                       "~/app/HR/Leave/employeeLeaveApplicationCtrl.js",
                       "~/app/Expenses/expensesTypeCtrl.js",
                       "~/app/Expenses/employeesExpensesCtrl.js",
                       "~/app/Expenses/employeesExpensesPaymentCtrl.js",


                       "~/app/Production/productionTypeCtrl.js",
                       "~/app/Production/productionOrderCategoryCtrl.js",
                       "~/app/Production/productionOrderCtrl.js",
                       "~/app/Production/productionOrderDeliveryCtrl.js",


                       "~/app/Production/productCostingCtrl.js",
                       "~/app/Production/materialRequirementsPlanningCtrl.js",
                       "~/app/Production/billofMaterialCategoryCtrl.js",
                       "~/app/Production/billofMaterialCtrl.js",
                        
                       "~/app/Purchase/purchaseBillCtrl.js",
                       "~/app/Purchase/purchaseBillPaymentCtrl.js",
                       "~/app/Sales/salesReceivePaymentCtrl.js",

                       "~/app/Sales/salesOrderCtrl.js"));

            bundles.Add(new ScriptBundle("~/directive/Scripts").Include(
                "~/common/filter/ngGroup.js",
                "~/common/filter/angular-filter.js",
                "~/common/directive/dirPagination.js",
                "~/common/directive/dirContextMenu.js",
                "~/common/directive/dirSplitter.js",
                "~/common/directive/dirRTCurrency.js",
                "~/common/directive/ng-file-upload-all.js",
                "~/common/directive/dirPrint.js"));


            bundles.Add(new ScriptBundle("~/Services/Scripts").Include(
                        "~/common/services/common.services.js",
                        "~/common/services/modalServices.js",
                        "~/common/services/commentResource.js",
                        "~/common/services/companyCategoryResource.js",
                        "~/common/services/companyBranchCategoryResource.js",
                        "~/common/services/CompanyTypeResource.js",
                        "~/common/services/CountryResource.js",
                        "~/common/services/CityResource.js",
                        "~/common/services/CurrencyResource.js",
                        "~/common/services/languageResource.js",
                        "~/common/services/companyBranchType.js",
                        "~/common/services/companyResource.js",
                        "~/common/services/accTypeResource.js",
                        "~/common/services/paymentMethodResource.js",
                        "~/common/services/voucherTypeResource.js",
                        "~/common/services/bankResource.js",
                        "~/common/services/bankBranchResource.js",
                        "~/common/services/bankAccountResource.js",

                        "~/common/services/bankAccountTypeResource.js",
                        "~/common/services/bankAccountOwnerTypeResource.js",
                        "~/common/services/fiscalYearResource.js",
                        "~/common/services/companyBranchResource.js",
                        "~/common/services/productCategoryResource.js",
                        "~/common/services/productResource.js",
                        "~/common/services/ProductReceiveDeliveryResource.js",
                        "~/common/services/ProductReceiveDeliveryDescriptionResource.js",

                        "~/common/services/accCOAResource.js",
                        "~/common/services/accCOAConfigResource.js",
                        "~/common/services/accCOAMappingResource.js",
                        "~/common/services/gLedgerResource.js",
                        "~/common/services/voucherListResource.js",
                        "~/common/services/trialBalanceResource.js",
                        "~/common/services/ledgerSheetResource.js",


                        "~/common/services/unitOfMeasureResource.js",
                        "~/common/services/collaboratorResource.js",
                        "~/common/services/customerTypeResource.js",
                        "~/common/services/employeeTypeResource.js",
                        "~/common/services/departmentResource.js",
                        "~/common/services/designationResource.js",
                        "~/common/services/supplierTypeResource.js",
                        "~/common/services/designationResource.js",
                        "~/common/services/MoneyRequisitionRequestResource.js",
                        "~/common/services/MoneyRequisitionResource.js",
                        "~/common/services/purchaseRequisitionResource.js",
                        "~/common/services/purchaseRequisitionDescriptionResource.js",
                        "~/common/services/requestForQuotationResource.js",
                        "~/common/services/requestForQuotationDescriptionResource.js",
                        "~/common/services/purchaseOrderResource.js",
                        "~/common/services/purchaseOrderDescriptionResource.js",

                        "~/common/services/uploadFileResource.js",


                        "~/common/services/purchaseDeliveryReceiveResource.js",
                        "~/common/services/purchaseDeliveryReceiveDescriptionResource.js",
                        "~/common/services/requisitionDeliveryResource.js",
                        "~/common/services/requisitionDeliveryDescriptionResource.js",

                        "~/common/services/maintainPurchaseQuotationResource.js",
                        "~/common/services/maintainPurchaseQuotationDescriptionResource.js",

                        "~/common/services/purchaseBillResource.js",
                        "~/common/services/purchaseBillDescriptionResource.js",
                        "~/common/services/purchaseOrderCategoryResource.js",


                        "~/common/services/salesQuotationResource.js",
                        "~/common/services/salesQuotationDescriptionResource.js",
                        "~/common/services/salesOrderResource.js",
                        "~/common/services/salesOrderDescriptionResource.js",
                        "~/common/services/salesQuotationCategoryResource.js",
                        "~/common/services/salesOrderCategoryResource.js",
                        "~/common/services/salesDeliveryCategoryResource.js",
                        "~/common/services/salesBillCategoryResource.js",

                        "~/common/services/salesDeliveryResource.js",
                        "~/common/services/salesDeliveryDescriptionResource.js",

                        "~/common/services/salesBillResource.js",
                        "~/common/services/salesBillDescriptionResource.js",


                        "~/common/services/projectSetupResource.js",
                        "~/common/services/projectSideResource.js",

                        "~/common/services/taxResource.js",
                        "~/common/services/formGroupPermissionResource.js",
                        "~/common/services/formListResource.js",
                        "~/common/services/formUserPermissionResource.js",
                        "~/common/services/WorkFlowResource.js",
                        "~/common/services/workFlowConfigResource.js",
                        "~/common/services/employeeLeaveTypeResource.js",
                        "~/common/services/employeeLeaveGroupResource.js",
                        "~/common/services/employeeLeaveApplicationResource.js",
                        "~/common/services/expensesTypeResource.js",
                        "~/common/services/employeesExpensesResource.js",
                        "~/common/services/employeeExpensesDescriptionResource.js",
                        "~/common/services/employeesExpensesPaymentResource.js",

                        "~/common/services/billofMaterialCategoryResource.js",
                        "~/common/services/billofMaterialResource.js",
                        "~/common/services/billofMaterialDescriptionResource.js",


                        "~/common/services/productionTypeResource.js",
                        "~/common/services/productionOrderCategoryResource.js",
                        "~/common/services/productionOrderResource.js",
                        "~/common/services/productionOrderDescriptionResource.js",
                        "~/common/services/productCostingResource.js",
                        "~/common/services/productCostingDescriptionResource.js",


                        "~/common/services/purchaseBillPaymentResource.js",
                        "~/common/services/salesReceivePaymentResource.js",
                        "~/common/services/userAuthorizeResource.js"));

            bundles.Add(new ScriptBundle("~/Customs/Scripts").Include(
                "~/Content/js/jquery/main.js"));


        }
    }
}