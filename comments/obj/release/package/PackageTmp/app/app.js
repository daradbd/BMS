
(function () {
    "use strict";
    var app = angular.module("companyManagement",
                            ["common.services",
                             "ngAnimate",
                             'ui.bootstrap',
                             'angularUtils.directives.dirPagination',
                             'ng.group',
                             'angularTreeview',
                             'io.dennis.contextmenu',
                             'angular.filter',
                             'bgDirectives',
                             'ng.ConfirmMsg',
                             "ui.router" ]);

    //app.config(function ($provide) {
    //    $provide.decorator("$exceptionHandler",
    //        ["$delegate",
    //            function ($delegate) {
    //                return function (exception, cause) {
    //                    exception.message = "Please contact the Help Desk! \n Message: " + exception.message;
    //                    $delegate(exception, cause);
    //                    toastr.error(exception.message);
    //                };
    //            }
    //        ]);

    //});

    
    app.factory('Util', function () {
        return {
            offsetTime: function (datetime) {
                var dt = new Date(datetime);
                var m = dt.getMinutes();
                var tm = dt.getTimezoneOffset();
                dt.setMinutes(m - tm);
                return dt;
            }

        }
    });



    app.config(["$stateProvider",
                "$urlRouterProvider",
                function ($stateProvider, $urlRouterProvider) {
                   

                    $urlRouterProvider.otherwise("/dashboard");


                    $stateProvider
                        //dashboard
                        .state("dashboard", {
                            url: "/dashboard",
                            templateUrl: "app/Dashboard/dashboard.html",
                            controller: "dashboardCtrl as vm",

                            resolve: {
                        
                            }
                        })
                        //comments
                        .state("comments", {
                            url: "/comments",
                            templateUrl: "app/TestModule/Comments.html",
                            controller: "commentListCtrl as vm",

                            resolve: {
                        
                            }
                        })
                        .state("login", {
                            url: "/Account/Login/"
                        })
                        .state("companyCategory", {
                            url: "companyCategory",
                            templateUrl: "app/setting/company/companyCategory/companyCategory.html",
                            controller: "companyCategoryCtrl as vm"
                        })
                        .state("companyType", {
                            url: "companyType",
                            templateUrl: "app/setting/company/companyType/companyType.html",
                            controller: "companyTypeCtrl as vm"
                        })
                        .state("country", {
                            url: "country",
                            templateUrl: "app/setting/common/country/country.html",
                            controller: "countryCtrl as vm"

                        })
                        .state("city", {
                            url: "city",
                            templateUrl: "app/setting/common/city/city.html",
                            controller: "cityCtrl as vm",
                        })
                        .state("currency", {
                            url: "currency",
                            templateUrl: "app/setting/common/currency/currency.html",
                            controller: "currencyCtrl as vm"
                        })
                        .state("language", {
                            url: "language",
                            templateUrl: "app/setting/common/language/language.html",
                            controller: "languageCtrl as vm"
                        })
                        //companyBranchType    
                        .state("companyBranchType", {
                            url: "/companyBranchType",
                            templateUrl: "app/setting/company/companyBranchType/companyBranchType.html",
                            controller: "companyBranchTypeCtrl as vm"
                        })
                        //companyBranchCategory    
                        .state("companyBranchCategory", {
                            url: "/companyBranchCategory",
                            templateUrl: "app/setting/company/companyBranchCategory/companyBranchCategory.html",
                            controller: "companyBranchCategoryCtrl as vm"
                        })
                        //companyBranchType    
                        .state("companyBranch", {
                            url: "/companyBranch",
                            templateUrl: "app/setting/company/companyBranch/companyBranch.html",
                            controller: "companyBranchCtrl as vm"
                        })
                        //company    
                        .state("company", {
                            url: "/company",
                            templateUrl: "app/setting/company/companyName/company.html",
                            controller: "companyCtrl as vm"
                        })

                        //formList    
                        .state("formList", {
                            url: "/formList",
                            templateUrl: "app/setting/Security/formList.html",
                            controller: "formListCtrl as vm"
                        })

                        //module
                        .state("module", {
                            url: "/module",
                            templateUrl: "app/setting/Security/module.html",
                            controller: "moduleCtrl as vm"
                        })

                        //formUserPermission
                        .state("formUserPermission", {
                            url: "/formUserPermission",
                            templateUrl: "app/setting/Security/formUserPermission.html",
                            controller: "formUserPermissionCtrl as vm"
                        })

                        //bank    
                        .state("bank", {
                            url: "/bank",
                            templateUrl: "app/Accounting/Configuration/Banks/bank.html",
                            controller: "bankCtrl as vm"
                        })
                        //accType    
                        .state("accType", {
                            url: "/accType",
                            templateUrl: "app/Accounting/Configuration/Accounts/accType.html",
                            controller: "accTypeCtrl as vm"
                        })
                        //accCOA   
                        .state("accCOA", {
                            url: "/accCOA",
                            templateUrl: "app/Accounting/Configuration/Accounts/accCOA.html",
                            controller: "accCOACtrl as vm"
                        })
                        //accCOA   
                        .state("accCOAConfig", {
                            url: "/accCOAConfig",
                            templateUrl: "app/Accounting/Configuration/Accounts/accCOAConfig.html",
                            controller: "accCOAConfigCtrl as vm"
                        })
                        //accCOA   
                        .state("accCOAMapping", {
                            url: "/accCOAMapping",
                            templateUrl: "app/Accounting/Configuration/Accounts/accCOAMapping.html",
                            controller: "accCOAMappingCtrl as vm"
                        })
                        //voucherType   
                        .state("voucherType", {
                            url: "/voucherType",
                            templateUrl: "app/Accounting/Configuration/Accounts/voucherType.html",
                            controller: "voucherTypeCtrl as vm"
                        })
                        //paymentMethod   
                        .state("paymentMethod", {
                            url: "/paymentMethod",
                            templateUrl: "app/Accounting/Configuration/Accounts/paymentMethod.html",
                            controller: "paymentMethodCtrl as vm"
                        })
                        //bankBranch   
                        .state("bankBranch", {
                            url: "/bankBranch",
                            templateUrl: "app/Accounting/Configuration/Banks/bankBranch.html",
                            controller: "bankBranchCtrl as vm"
                        })
                        //bankAccountOwnerType    
                        .state("bankAccountOwnerType", {
                            url: "/bankAccountOwnerType",
                            templateUrl: "app/Accounting/Configuration/Banks/bankAccountOwnerType.html",
                            controller: "bankAccountOwnerTypeCtrl as vm"
                        })
                        //bank    
                        .state("bankAccountType", {
                            url: "/bankAccountType",
                            templateUrl: "app/Accounting/Configuration/Banks/bankAccountType.html",
                            controller: "bankAccountTypeCtrl as vm"
                        })
                        //bankAccount  
                        .state("bankAccount", {
                            url: "/bankAccount",
                            templateUrl: "app/Accounting/Configuration/Banks/bankAccount.html",
                            controller: "bankAccountCtrl as vm"
                        })

                        //fiscalYear
                        .state("fiscalYear", {
                            url: "/fiscalYear",
                            templateUrl: "app/Accounting/Configuration/Periods/fiscalYear.html",
                            controller: "fiscalYearCtrl as vm"
                        })
                        //productCategory
                        .state("productCategory", {
                            url: "/productCategory",
                            templateUrl: "app/Inventory/Product/productCategory.html",
                            controller: "productCategoryCtrl as vm"
                        })
                        //productBrand
                        .state("productBrand", {
                            url: "/productBrand",
                            templateUrl: "app/Inventory/Product/productBrand.html",
                            controller: "productBrandCtrl as vm"
                        })
                        //productSpecification
                        .state("productSpecification", {
                            url: "/productSpecification",
                            templateUrl: "app/Inventory/Product/productSpecification.html",
                            controller: "productSpecificationCtrl as vm"
                        })
                        //product
                        .state("product", {
                            url: "/product",
                            templateUrl: "app/Inventory/Product/product.html",
                            controller: "productCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { ProductTypeID: 1, ProductTypeName: 'Product' };
                                }
                            }
                        })

                        //product for Sales
                        .state("productForSales", {
                            url: "/productForSales",
                            templateUrl: "app/Inventory/Product/product.html",
                            controller: "productCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { ProductTypeID: 2, ProductTypeName: 'Product For Sales' };
                                }
                            }
                        })
                        //Raw Materials
                        .state("rawMaterials", {
                            url: "/rawMaterials",
                            templateUrl: "app/Inventory/Product/product.html",
                            controller: "productCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { ProductTypeID: 3, ProductTypeName: 'Raw Materials' };
                                }
                            }

                        })


                        //UnitOfMeasure
                        .state("unitOfMeasure", {
                            url: "/product",
                            templateUrl: "app/Inventory/Product/unitOfMeasure.html",
                            controller: "unitOfMeasureCtrl as vm"
                        })
                        //ProductReceiveDelivery
                        .state("productReceiveDelivery", {
                            url: "/productReceiveDelivery",
                            templateUrl: "app/Inventory/Product/productReceiveDelivery.html",
                            controller: "productReceiveDeliveryCtrl as vm"
                        })
                        //customerType
                        .state("customerType", {
                            url: "/customerType",
                            templateUrl: "app/HR/customerType.html",
                            controller: "customerTypeCtrl as vm"
                        })
                        //supplierType
                        .state("supplierType", {
                            url: "/supplierType",
                            templateUrl: "app/HR/supplierType.html",
                            controller: "supplierTypeCtrl as vm"
                        })
                        //employeeType
                        .state("employeeType", {
                            url: "/employeeType",
                            templateUrl: "app/HR/employeeType.html",
                            controller: "employeeTypeCtrl as vm"
                        })
                        //department
                        .state("department", {
                            url: "/department",
                            templateUrl: "app/HR/department.html",
                            controller: "departmentCtrl as vm"
                        })
                        //UnitOfMeasure
                        .state("designation", {
                            url: "/designation",
                            templateUrl: "app/HR/designation.html",
                            controller: "designationCtrl as vm"
                        })
                        //Suppliers
                        .state("suppliers", {
                            url: "/suppliers",
                            templateUrl: "app/HR/supplier.html",
                            controller: "supplierCtrl as vm"
                        })
                        //Customers
                        .state("customers", {
                            url: "/customers",
                            templateUrl: "app/HR/customer.html",
                            controller: "customerCtrl as vm"
                        })
                        //employees
                        .state("employees", {
                            url: "/employees",
                            templateUrl: "app/HR/employee.html",
                            controller: "employeeCtrl as vm"
                        })
                        //voucherList
                        .state("voucherList", {
                            url: "/voucherList",
                            templateUrl: "app/Accounting/Transaction/voucherList.html",
                            controller: "voucherListCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { VoucherTypeID: 1, VoucherTypeName: 'Debit Voucher' };
                                }
                            }

                        })
                        //Debit Voucher
                        .state("debitVoucher", {
                            url: "/debitVoucher",
                            templateUrl: "app/Accounting/Transaction/voucherList.html",
                            controller: "voucherListCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { VoucherTypeID: 1, VoucherTypeName: 'Debit Voucher' };
                                }
                            }

                        })
                        //Credit Voucher
                        .state("creditVoucher", {
                            url: "/creditVoucher",
                            templateUrl: "app/Accounting/Transaction/voucherList.html",
                            controller: "voucherListCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { VoucherTypeID: 2, VoucherTypeName: 'Credit Voucher' };
                                }
                            }

                        })

                        //Journal Voucher
                        .state("journalVoucher", {
                            url: "/journalVoucher",
                            templateUrl: "app/Accounting/Transaction/voucherList.html",
                            controller: "voucherListCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { VoucherTypeID: 3, VoucherTypeName: 'Journal Voucher' };
                                }
                            }

                        })

                        //Contra Voucher
                        .state("contraVoucher", {
                            url: "/contraVoucher",
                            templateUrl: "app/Accounting/Transaction/voucherList.html",
                            controller: "voucherListCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { VoucherTypeID: 4, VoucherTypeName: 'Contra Voucher' };
                                }
                            }

                        })

                        //payOrderCategory
                        .state("payOrderCategory", {
                            url: "/payOrderCategory",
                            templateUrl: "app/Accounting/PayOrders/payOrderCategory.html",
                            controller: "payOrderCategoryCtrl as vm"

                        })

                        //payOrder
                        .state("payOrder", {
                            url: "/payOrder",
                            templateUrl: "app/Accounting/PayOrders/payOrder.html",
                            controller: "payOrderCtrl as vm"

                        })

                        //trialBalance
                        .state("purchaseBillApproval", {
                            url: "/purchaseBillApproval",
                            templateUrl: "app/Accounting/Approval/purchaseBillApproval.html",
                            controller: "purchaseBillApprovalCtrl as vm"
                        })

                        //trialBalance
                        .state("trialBalance", {
                            url: "/trialBalance",
                            templateUrl: "app/Accounting/Transaction/Report/trialBalance.html",
                            controller: "trialBalanceCtrl as vm"
                        })
                        //ledgerSheet
                        .state("ledgerSheet", {
                            url: "/ledgerSheet",
                            templateUrl: "app/Accounting/Transaction/Report/ledgerSheet.html",
                            controller: "ledgerSheetCtrl as vm"
                        })
                         //Bank Ledger
                        .state("bankLedger", {
                            url: "/bankLedger",
                            templateUrl: "app/Accounting/Transaction/Report/customLedgerSheet.html",
                            controller: "customLedgerSheetCtrl as vm",
                            resolve: {
                                param: function () {
                                    return { id: 3,FilterType:1, LedgerSheetName: 'Bank Ledger' };
                                }
                            }

                        })
                        //Customer Ledger
                        .state("customerLedger", {
                            url: "/customerLedger",
                            templateUrl: "app/Accounting/Transaction/Report/customLedgerSheet.html",
                            controller: "customLedgerSheetCtrl as vm",
                            resolve: {
                                param: function () {
                                    return { id: 5,FilterType:1, LedgerSheetName: 'Customer Ledger' };
                                }
                            }

                        })
                         //Supplier Ledger
                        .state("supplierLedger", {
                            url: "/supplierLedger",
                            templateUrl: "app/Accounting/Transaction/Report/customLedgerSheet.html",
                            controller: "customLedgerSheetCtrl as vm",
                            resolve: {
                                param: function () {
                                    return { id: 10,FilterType:1, LedgerSheetName: 'Supplier Ledger' };
                                }
                            }

                        })

                         //supplierFile
                        .state("supplierFile", {
                            url: "/supplierFile",
                            templateUrl: "app/Accounting/Reports/Suppliers/supplierFile.html",
                            controller: "supplierFileCtrl as vm"
                        })

                        //customerFile
                        .state("customerFile", {
                            url: "/customerFile",
                            templateUrl: "app/Accounting/Reports/Customers/customerFile.html",
                            controller: "customerFileCtrl as vm"
                        })


                        //salesQuotationCategory
                        .state("salesQuotationCategory", {
                            url: "/salesQuotationCategory",
                            templateUrl: "app/Sales/salesQuotationCategory.html",
                            controller: "salesQuotationCategoryCtrl as vm"
                        })
                        //salesOrderCategory
                        .state("salesOrderCategory", {
                            url: "/salesOrderCategory",
                            templateUrl: "app/Sales/salesOrderCategory.html",
                            controller: "salesOrderCategoryCtrl as vm"
                        })
                        //salesDeliveryCategory
                        .state("salesDeliveryCategory", {
                            url: "/salesDeliveryCategory",
                            templateUrl: "app/Sales/salesDeliveryCategory.html",
                            controller: "salesDeliveryCategoryCtrl as vm"
                        })
                        //salesBillCategory
                        .state("salesBillCategory", {
                            url: "/salesBillCategory",
                            templateUrl: "app/Sales/salesBillCategory.html",
                            controller: "salesBillCategoryCtrl as vm"
                        })

                        //salesQuotation
                        .state("salesQuotation", {
                            url: "/salesQuotation",
                            templateUrl: "app/Sales/salesQuotation.html",
                            controller: "salesQuotationCtrl as vm"
                        })
                        //salesOrder
                        .state("salesOrder", {
                            url: "/salesOrder",
                            templateUrl: "app/Sales/salesOrder.html",
                            controller: "salesOrderCtrl as vm"
                        })
                        //salesDelivery
                        .state("salesDelivery", {
                            url: "/salesDelivery",
                            templateUrl: "app/Sales/salesDelivery.html",
                            controller: "salesDeliveryCtrl as vm"
                        })
                        //salesBill
                        .state("salesBill", {
                            url: "/salesBill",
                            templateUrl: "app/Sales/salesBill.html",
                            controller: "salesBillCtrl as vm"

                        })
                        //moneyRequisitionRequest
                        .state("moneyRequisitionRequest", {
                            url: "/moneyRequisitionRequest",
                            templateUrl: "app/Purchase/moneyRequisitionRequest.html",
                            controller: "moneyRequisitionRequestCtrl as vm"
                        })
                        //moneyRequisition
                        .state("moneyRequisition", {
                            url: "/moneyRequisition",
                            templateUrl: "app/Purchase/moneyRequisition.html",
                            controller: "moneyRequisitionCtrl as vm"
                        })
                        //purchaseRequisition
                        .state("purchaseRequisition", {
                            url: "/purchaseRequisition",
                            templateUrl: "app/Purchase/purchaseRequisition.html",
                            controller: "purchaseRequisitionCtrl as vm"
                        })
                        //purchaseOrderCategory
                        .state("purchaseOrderCategory", {
                            url: "/purchaseOrderCategory",
                            templateUrl: "app/Purchase/purchaseOrderCategory.html",
                            controller: "purchaseOrderCategoryCtrl as vm"
                        })
                        //requisitionDelivery
                        .state("requisitionDelivery", {
                            url: "/requisitionDelivery",
                            templateUrl: "app/Purchase/requisitionDelivery.html",
                            controller: "requisitionDeliveryCtrl as vm"
                        })
                        //requisitionReceive
                        .state("requisitionReceive", {
                            url: "/requisitionReceive",
                            templateUrl: "app/Purchase/requisitionReceive.html",
                            controller: "requisitionReceiveCtrl as vm"
                        })

                        //requestForQuotation
                        .state("requestForQuotation", {
                            url: "/requestForQuotation",
                            templateUrl: "app/Purchase/requestForQuotation.html",
                            controller: "requestForQuotationCtrl as vm"
                        })

                        //maintainPurchaseQuotation
                        .state("maintainPurchaseQuotation", {
                            url: "/maintainPurchaseQuotation",
                            templateUrl: "app/Purchase/maintainPurchaseQuotation.html",
                            controller: "maintainPurchaseQuotationCtrl as vm"
                        })
                        //purchaseOrder
                        .state("purchaseOrder", {
                            url: "/purchaseOrder",
                            templateUrl: "app/Purchase/purchaseOrder.html",
                            controller: "purchaseOrderCtrl as vm"
                        })
                        //purchaseOrder
                        .state("purchaseOrderList", {
                            url: "/purchaseOrderList",
                            templateUrl: "app/Purchase/purchaseOrderList.html",
                            controller: "purchaseOrderListCtrl as vm"
                        })
                        .state("purchaseApproval", {
                            url: "/purchaseApproval",
                            templateUrl: "app/Purchase/purchaseApproval.html",
                            controller: "purchaseApprovalCtrl as vm"
                        })
                        //purchaseDeliveryReceive
                        .state("purchaseDeliveryReceive", {
                            url: "/purchaseDeliveryReceive",
                            templateUrl: "app/Purchase/purchaseDeliveryReceive.html",
                            controller: "purchaseDeliveryReceiveCtrl as vm"
                        })
                        //employeeLeaveType
                        .state("employeeLeaveType", {
                            url: "/employeeLeaveType",
                            templateUrl: "app/HR/Leave/employeeLeaveType.html",
                            controller: "employeeLeaveTypeCtrl as vm"
                        })
                        //employeeLeaveGroup
                        .state("employeeLeaveGroup", {
                            url: "/employeeLeaveGroup",
                            templateUrl: "app/HR/Leave/employeeLeaveGroup.html",
                            controller: "employeeLeaveGroupCtrl as vm"
                        })
                        //employeeLeaveApplication
                        .state("employeeLeaveApplication", {
                            url: "/employeeLeaveApplication",
                            templateUrl: "app/HR/Leave/employeeLeaveApplication.html",
                            controller: "employeeLeaveApplicationCtrl as vm"
                        })

                        //salaryComponents
                        .state("salaryComponents", {
                            url: "/salaryComponents",
                            templateUrl: "app/Payroll/salaryComponents.html",
                            controller: "salaryComponentsCtrl as vm"
                        })

                        //salaryComponentConfig
                        .state("salaryComponentConfig", {
                            url: "/salaryComponentConfig",
                            templateUrl: "app/Payroll/salaryComponentConfig.html",
                            controller: "salaryComponentConfigCtrl as vm"
                        })
                        //salaryComponentMapping
                        .state("salaryComponentMapping", {
                            url: "/salaryComponentMapping",
                            templateUrl: "app/Payroll/salaryComponentMapping.html",
                            controller: "salaryComponentMappingCtrl as vm"
                        })
                        //salaryComponents
                        .state("attendanceAudit", {
                            url: "/attendanceAudit",
                            templateUrl: "app/Payroll/attendanceAudit.html",
                            controller: "attendanceAuditCtrl as vm"
                        })

                        //payrollProcess
                        .state("payrollProcess", {
                            url: "/payrollProcess",
                            templateUrl: "app/Payroll/payrollProcess.html",
                            controller: "payrollProcessCtrl as vm"
                        })
                        //employeeLeaveApplication
                        .state("expensesType", {
                            url: "/expensesType",
                            templateUrl: "app/Expenses/expensesType.html",
                            controller: "expensesTypeCtrl as vm"
                        })
                        //employeesExpenses
                        .state("employeesExpenses", {
                            url: "/employeesExpenses",
                            templateUrl: "app/Expenses/employeesExpenses.html",
                            controller: "employeesExpensesCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { FormTypeID: 1, FormName: "Employees Expenses" };
                                }
                            }
                        })
                        //employeesExpensesApprove
                        .state("employeesExpensesApprovel", {
                            url: "/employeesExpensesApprovel",
                            templateUrl: "app/Expenses/employeesExpenses.html",
                            controller: "employeesExpensesCtrl as vm",
                            resolve: {
                                param: function() {
                                    return { FormTypeID: 2, FormName: "Employees Expenses Approvel" };
                                }
                            }
                        })
                        //employeesExpenses
                        //.state("employeeExpensesDescription", {
                        //    url: "/employeeExpensesDescription",
                        //    templateUrl: "app/Expenses/employeeExpensesDescription.html",
                        //    controller: "employeeExpensesDescriptionCtrl as vm"
                        //})
                        //employeesExpensesPayment
                        .state("employeesExpensesPayment", {
                            url: "/employeesExpensesPayment",
                            templateUrl: "app/Expenses/employeesExpensesPayment.html",
                            controller: "employeesExpensesPaymentCtrl as vm"
                        })

                        //materialRequirementsPlanning
                        .state("productCosting", {
                            url: "/productCosting",
                            templateUrl: "app/Production/productCosting.html",
                            controller: "productCostingCtrl as vm"
                        })


                        //materialRequirementsPlanning
                        .state("materialRequirementsPlanning", {
                            url: "/materialRequirementsPlanning",
                            templateUrl: "app/Production/materialRequirementsPlanning.html",
                            controller: "materialRequirementsPlanningCtrl as vm"
                        })

                        //billofMaterial
                        .state("billofMaterialCategory", {
                            url: "/billofMaterialCategory",
                            templateUrl: "app/Production/billofMaterialCategory.html",
                            controller: "billofMaterialCategoryCtrl as vm"
                        })
                        //billofMaterial
                        .state("billofMaterial", {
                            url: "/billofMaterial",
                            templateUrl: "app/Production/billofMaterial.html",
                            controller: "billofMaterialCtrl as vm"
                        })

                        //productionOrderCategory
                        .state("productionOrderCategory", {
                            url: "/productionOrderCategory",
                            templateUrl: "app/Production/productionOrderCategory.html",
                            controller: "productionOrderCategoryCtrl as vm"
                        })
                        //productionOrder
                        .state("productionOrder", {
                            url: "/productionOrder",
                            templateUrl: "app/Production/productionOrder.html",
                            controller: "productionOrderCtrl as vm"
                        })

                        //productionOrderDelivery
                        .state("productionOrderDelivery", {
                            url: "/productionOrderDelivery",
                            templateUrl: "app/Production/productionOrderDelivery.html",
                            controller: "productionOrderDeliveryCtrl as vm"
                        })
                        //billofMaterial
                        //.state("billofMaterialDescription", {
                        //    url: "/billofMaterialDescription",
                        //    templateUrl: "app/Production/billofMaterialDescription.html",
                        //    controller: "billofMaterialDescription as vm"
                        //})
                        //productionType
                        .state("productionType", {
                            url: "/productionType",
                            templateUrl: "app/Production/productionType.html",
                            controller: "productionTypeCtrl as vm"
                        })
                        // purchaseBill
                        .state("purchaseBill", {
                            url: "/purchaseBill",
                            templateUrl: "app/Purchase/purchaseBill.html",
                            controller: "purchaseBillCtrl as vm"
                        })
                        //purchaseBillPayment
                        .state("purchaseBillPayment", {
                            url: "/purchaseBillPayment",
                            templateUrl: "app/Purchase/purchaseBillPayment.html",
                            controller: "purchaseBillPaymentCtrl as vm"
                        })
                        //salesReceivePayment
                        .state("salesReceivePayment", {
                            url: "/salesReceivePayment",
                            templateUrl: "app/Sales/salesReceivePayment.html",
                            controller: "salesReceivePaymentCtrl as vm"
                        });
                }
    ]

        );

}());