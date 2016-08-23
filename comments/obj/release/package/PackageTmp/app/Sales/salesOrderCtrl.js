(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesOrderresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesOrderResource
     *  @date: 29/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesOrderCtrl", ["companyBranchResource", "salesOrderCategoryResource", "unitOfMeasureResource", "Util", "currencyResource", "languageResource", "countryResource", "cityResource", "projectSideResource", "projectSetupResource", "salesQuotationDescriptionResource", "$rootScope", "$state", "salesOrderDescriptionResource", "productResource", "collaboratorResource", "salesOrderResource", "$uibModal", "appAuth", salesOrderCtrl]);
    function salesOrderCtrl(companyBranchResource,salesOrderCategoryResource, unitOfMeasureResource, Util, currencyResource, languageResource, countryResource, cityResource, projectSideResource, projectSetupResource, salesQuotationDescriptionResource, $rootScope, $state, salesOrderDescriptionResource, productResource, collaboratorResource, salesOrderResource, $uibModal, appAuth) {
        var vm = this;

        vm.Totaltax = 0.00;
        vm.TotlaDiscount = 0.00;
        vm.GTotal = 0.00;
        vm.Shipping = 0.00;

        vm.salesOrders = [];
        vm.salesOrderCategorys = [];
        vm.collaborators = [];
        vm.products = [];
        vm.companyBranch = {};
        vm.projectSetup = {};
        appAuth.checkPermission();


        vm.isLoad = true;

        vm.SalesOrderDescription = { salesOrderDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

     
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false;
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.ActionButton = false;
        vm.ImportToExcelButton = false;
        vm.CancelButton = false;

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }).$promise.then(function (data) {
                vm.citys = data;
                //toastr.success("Data function Load Successful", "Form Load");

            });
        }

        vm.addItem = function (SalesSectionID, SalesSectionName) {
            vm.SalesOrderDescription.salesOrderDesc.unshift({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {
            vm.SalesOrderDescription.salesOrderDesc.push({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "",MOUID:0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
            if (item.SalesOrderDescriptionID > 0) {
                vm.salesOrderDescriptionItem = item;
                vm.DeleteDescription(item.SalesOrderDescriptionID);
            }
            vm.SalesOrderDescription.salesOrderDesc.splice(vm.SalesOrderDescription.salesOrderDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = 0;//item.cmbProductID.SalePrice;
        }

        vm.ssopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }
        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }

        vm.eopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.eopened = !vm.eopened;

        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        vm.SubTotal = function (item) {
            return ((item.UnitPrice) * item.Quantity);
        }

        vm.QuotationSubTotal = function () {
            var total = 0.00;
            var Totaltax = 0.00;
            var TotlaDiscount = 0.00;
            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (item, key) {
                total += (item.Quantity * (item.UnitPrice));
                if (item.Taxes > 0) {
                    Totaltax += ((item.Quantity * (item.UnitPrice - item.Discount)) * (item.Taxes) * 0.01);

                }
                if (item.Discount > 0) {
                    TotlaDiscount += (item.Quantity * item.Discount);
                }

            });
            vm.Totaltax = Totaltax;
            vm.TotlaDiscount = TotlaDiscount;
            vm.GTotal = (total + vm.Totaltax + vm.Shipping) - vm.TotlaDiscount;
            return total;
        }

        vm.SectionSubTotal = function (SectionID) {
            var total = 0.00;
            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (item, key) {
                if (item.SalesSectionID == SectionID) {
                    total += (item.Quantity * (item.UnitPrice - item.Discount));
                }

            });
            return total;
        }

        vm.UpdateSectionName = function (SectionID, SalesSectionName) {
            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (item, key) {
                if (item.SalesSectionID == SectionID) {
                    item.SalesSectionName = SalesSectionName;
                }

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        vm.UpdatePercentage = function (Value, KeyName) {
            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (item, key) {

                item[KeyName] = Value;


            });

        }

        vm.ShowProductForm = function (item) {
            $uibModal.open({
                templateUrl: "app/Inventory/Product/product.html",
                size: 'lg',
                controller: "productCtrl as vm"
            });
        }


        vm.ShowUOMForm = function (item) {
            $uibModal.open({
                templateUrl: "app/Inventory/Product/unitOfMeasure.html",
                size: 'lg',
                controller: "unitOfMeasureCtrl as vm"
            });
        }
        vm.ShowCustomerForm = function () {

            var CustomerForm = $uibModal.open({
                templateUrl: "app/HR/customer.html",
                size: 'lg',
                controller: "customerModalCtrl as vm",
                resolve: {
                    customerFormData: function () {
                        return {
                            FormMode: function () {
                                return 2;
                            }


                        };
                    }
                },
            });

            CustomerForm.result.then(function (selectedItem) {
                vm.isLoad = true;
                collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {

                    vm.collaborators = data;
                    //toastr.success("Data Load Successful", "Form Load");
                    vm.cmbCustomer = selectedItem;
                    vm.isLoad = false;
                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });

            });
        }

        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.UnitOfMeasures = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetSalesOrderCateagorys();
        function GetSalesOrderCateagorys() {
            salesOrderCategoryResource.query().$promise.then(function (data) {
                vm.salesOrderCategorys = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetLanguage();
        function GetLanguage() {
            languageResource.query().$promise.then(function (data) {
                vm.Languages = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        GetCurrency();
        function GetCurrency() {
            currencyResource.query().$promise.then(function (data) {
                vm.Currencys = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })

        }

        GetcountrysList();
        function GetcountrysList() {
            countryResource.query().$promise.then(function (data) {
                vm.countrys = data;
                //toastr.success("Load country", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProjectManagerList();
        //Get All Data List
        function GetProjectManagerList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.ProjectManagers = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query().$promise.then(function (data) {
                vm.products = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.salesOrder = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.ImportToExcelButton = false;
                vm.CancelButton = true;
            }
            if (activeMode == 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.ImportToExcelButton = false;
                vm.CancelButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.ActionButton = true;
                vm.ImportToExcelButton = true;
                vm.CancelButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;


                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.ActionButton = true;
                vm.ImportToExcelButton = false;
                vm.CancelButton = true;
            }
        }

        var DispayButton = function () {

        }

        vm.SalesDeliver = function (OrderID) {
            $rootScope.SOrderID = OrderID;
            $state.go('salesDelivery');
        }


        vm.ProductionOrder = function (OrderID) {
            $rootScope.SOrderID = OrderID;
            $state.go('productionOrder');
        }

        vm.SalesBill = function (OrderID) {
            $rootScope.SOrderID = OrderID;
            $state.go('salesBill');
        }
        GetCustomerList();
        //Get All Data List
        function GetCustomerList() {
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesOrderResource.query().$promise.then(function (data) {
                vm.salesOrders = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.Save = function (isValid) {
            if (vm.HasProjectSide == true)
            {
                SaveProjectSide((vm.companyBranch !== undefined) && (vm.companyBranch !== null) && (vm.companyBranch !== ""));
            }
            else
            {
                
                SaveProjectSetup();
            }
               

        }

        //Save salesOrder
        vm.SaveSales = function (isValid) {
            if (isValid) {

                vm.salesOrder.TaxAmount = vm.Totaltax;
                vm.salesOrder.DiscountAmount = vm.TotlaDiscount;
                vm.salesOrder.GrandTotal = vm.GTotal;
                vm.salesOrder.Shipping = vm.Shipping;
                vm.salesOrder.ProjectID = vm.projectSetup.ProjectID;
                vm.salesOrder.ProcesStatusID = 15;
                vm.salesOrder.Date = Util.offsetTime(vm.salesOrder.Date);
                salesOrderResource.save(vm.salesOrder).$promise.then(
                    function (data, responseHeaders) {

                        vm.salesOrder = data;
                       
                        GetList();
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Load Failed!");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }




        //Save Order Description
        vm.SaveOrder = function () {
           

            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var salesOrderInfo = {
                    SalesOrderDescriptionID: value.SalesOrderDescriptionID,
                    SalesOrderID: vm.salesOrder.SalesOrderID,
                    CustomerID: vm.salesOrder.CustomerID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    UOMID: value.UOMID,
                    UnitPrice: value.UnitPrice,
                    Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                salesOrderDescriptionResource.save(salesOrderInfo,
                function (data, responseHeaders) {

                });
            })


        }


        function SaveProjectSetup() {
            vm.projectSetup.CustomerID = vm.salesOrder.CustomerID;
            

            projectSetupResource.save(vm.projectSetup).$promise.then(function (data, responseHeaders) {

                        vm.projectSetup = data;
                        
                        if (vm.salesOrder.SalesOrderID > 0)
                        {
                            vm.SaveOrder();
                            vm.salesOrder.ProcesStatusID = 15;
                            vm.salesOrder.ProjectID = vm.projectSetup.ProjectID;
                            vm.Update(true);
                        }
                        else
                        {
                            vm.SaveSales(true);
                        }
                       
                        toastr.success("Save Successful");
            }, function (error) {
                // error handler
                toastr.error("Data Save Failed!");
            });
        }


        //function SaveProjectSide( ) {
        //    vm.projectSide.CountryID = vm.cmbcountrys.CountryID;
        //    vm.projectSide.CityID = vm.cmbCitys.CityID;
        //    vm.projectSide.LanguageID = vm.cmbLanguages.LanguageID;
        //    vm.projectSide.CurrencyID = vm.cmbCurrencys.CurrencyID;

        //    projectSideResource.save(vm.projectSide).$promise.then(
        //                function (data, responseHeaders) {
        //                    vm.projectSide = data;
        //                    vm.projectSetup.ProjectSideID = vm.projectSide.ProjectSideID;
        //                    SaveProjectSetup();
        //                }, function (error) {
        //                    // error handler
        //                    toastr.error("Data Load Failed!");
        //                });



        //};

         function SaveProjectSide(isValid) {
            if (isValid) {
                //vm.companyBranch.CompanyID = vm.cmbCompany.CompanyID;
                //vm.companyBranch.ParentBranchID = vm.cmbParentBranch.CompanyBranchID;
                //vm.companyBranch.CompanyBranchTypeID = vm.cmbCompanyBranchTypes.CompanyBranchTypeID;
                vm.companyBranch.CompanyBranchCategoryID = 5;
                vm.companyBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.companyBranch.CityID = vm.cmbCitys.CityID;
                vm.companyBranch.LanguageID = vm.cmbLanguages.LanguageID;
                vm.companyBranch.CurrencyID = vm.cmbCurrencys.CurrencyID;

                companyBranchResource.save(vm.companyBranch).$promise.then(
                    function (data, responseHeaders) {
                       
                        vm.companyBranch = data;
                        vm.projectSetup.ProjectSideID = vm.companyBranch.CompanyBranchID;
                        SaveProjectSetup();

                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }


        //Get Single Record
        vm.Get = function (id) {
            salesOrderResource.get({ 'ID': id }).$promise.then(function (salesOrder) {
                vm.salesOrder = salesOrder;
                vm.cmbSalesOrderCategory = { SalesOrderCategoryID: vm.salesOrder.SalesOrderCategoryID };
                if (vm.salesOrder.ProjectID != null)
                {
                    vm.GetProjectSetup(vm.salesOrder.ProjectID);
                }
                
                vm.cmbCustomer = vm.salesOrder.Collaborator;
               // vm.cmbCustomer = { CollaboratorID: vm.salesOrder.CustomerID }

                if (vm.salesOrder.ProcesStatusID == 14) {
                    vm.GetSalesQuotationDescription(vm.salesOrder.SalesQuotationID);
                }
                else {
                    vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
                }
                vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }).$promise.then(function (data) {
                vm.SalesOrderDescription.salesOrderDesc = data;
                //toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetSalesQuotationDescription = function (salesQuotationID) {

            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }).$promise.then(function (data) {
                vm.SalesOrderDescription.salesOrderDesc = data;
               // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Get Single Record
        vm.GetProjectSide = function (id) {
            companyBranchResource.get({ 'ID': id }).$promise.then(function (companyBranch) {
                vm.companyBranch = companyBranch;
                vm.cmbcountrys = vm.companyBranch.Country;
                vm.selectCity(vm.companyBranch.CountryID).then(function () {
                     vm.cmbCitys = vm.companyBranch.City;
                     vm.cmbLanguages =vm.companyBranch.Language;
                     vm.cmbCurrencys = vm.companyBranch.Currency;   
                }
               );
                

               // vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        //Get Single Record
        vm.GetProjectSetup = function (id) {
            projectSetupResource.get({ 'ID': id }).$promise.then(function (projectSetup) {
                vm.projectSetup = projectSetup;
                vm.cmbProjectManager = { CollaboratorID: vm.projectSetup.ProjectManagerID };
                vm.HasProjectSide = (vm.projectSetup.ProjectSideID == null ? false : true);
                if (vm.projectSetup.ProjectSideID != null)
                {
                        vm.GetProjectSide(vm.projectSetup.ProjectSideID);
                }
                //vm.GetProjectSide(vm.projectSetup.ProjectSideID);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Project Load Failed!");
            });
        }
        //vm.CreateOrder = function () {
        //    if (vm.salesOrder.HasProjectSide == true)
        //    {
        //        vm.projectSide = SaveProjectSide();
        //    }
        //    else
        //    {
        //        vm.SaveProjectSetup(true);
        //    }

        //    vm.salesOrder.ProcesStatusID = 15;
        //    vm.salesOrder.ProjectID = vm.projectSetup.ProjectID;
        //    vm.Update(true);
        //}

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.salesOrder.TaxAmount = vm.Totaltax;
                vm.salesOrder.DiscountAmount = vm.TotlaDiscount;
                vm.salesOrder.GrandTotal = vm.GTotal;
                vm.salesOrder.Shipping = vm.Shipping;
                salesOrderResource.update({ 'ID': vm.salesOrder.SalesOrderID }, vm.salesOrder).$promise.then(function () {
                vm.UpdateProjectSetup();
                vm.salesOrders = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Update
        vm.UpdateProjectSetup = function () {

            projectSetupResource.update({ 'ID': vm.projectSetup.ProjectID }, vm.projectSetup).$promise.then(function () {

        }, function (error) {
            // error handler
            toastr.error("Data Update Failed!");
        });}

        //Data Update
        //vm.UpdateProjectSide = function (isValid) {
        //    if (isValid) {
        //        vm.companyBranch.CompanyID = vm.cmbCompany.CompanyID;
        //        vm.companyBranch.ParentBranchID = vm.cmbParentBranch.CompanyBranchID;
        //        vm.companyBranch.CompanyBranchTypeID = vm.cmbCompanyBranchTypes.CompanyBranchTypeID;
        //        vm.companyBranch.CompanyBranchCategoryID = vm.cmbCompanyBranchCategorys.CompanyBranchCategoryID;
        //        vm.companyBranch.CountryID = vm.cmbcountrys.CountryID;
        //        vm.companyBranch.CityID = vm.cmbCitys.CityID;
        //        vm.companyBranch.LanguageID = vm.cmbLanguages.LanguageID;
        //        vm.companyBranch.CurrencyID = vm.cmbCurrencys.CurrencyID;
        //        companyBranchResource.update({ 'ID': vm.companyBranch.CompanyBranchID }, vm.companyBranch);
        //        vm.companyBranchs = null;
        //        vm.ViewMode(3);
        //        GetList();
        //        toastr.success("Data Update Successful", "Form Update");
        //    }
        //    else {
        //        toastr.error("Form is not valid");
        //    }
        //}

 //Data Delete
        vm.DeleteDescription = function (SalesOrderDescriptionID) {
            ///vm.salesOrder.$delete({ 'ID': vm.salesOrder.SalesOrderID });
            salesOrderDescriptionResource.delete({ 'ID': SalesOrderDescriptionID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }





        //Data Delete
        vm.Delete = function () {
            ///vm.salesOrder.$delete({ 'ID': vm.salesOrder.SalesOrderID });
            companyBranchResource.delete({ 'ID':vm.salesOrder.SalesOrderID  }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }
}());