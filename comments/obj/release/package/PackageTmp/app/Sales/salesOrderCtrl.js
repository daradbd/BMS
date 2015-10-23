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
        .controller("salesOrderCtrl", ["currencyResource", "languageResource", "countryResource", "cityResource", "projectSideResource", "projectSetupResource", "salesQuotationDescriptionResource", "$rootScope", "$state", "salesOrderDescriptionResource", "productResource", "collaboratorResource", "salesOrderResource", salesOrderCtrl]);
    function salesOrderCtrl(currencyResource, languageResource, countryResource, cityResource, projectSideResource, projectSetupResource, salesQuotationDescriptionResource, $rootScope, $state, salesOrderDescriptionResource, productResource, collaboratorResource, salesOrderResource) {
        var vm = this;
        vm.salesOrders = []
        vm.collaborators = [];
        vm.products = [];
        vm.companyBranch = [];
       

        vm.SalesOrderDescription = { salesOrderDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

     
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.ActionButton = false;

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }

        vm.addItem = function (SalesSectionID, SalesSectionName) {
            vm.SalesOrderDescription.salesOrderDesc.unshift({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {
            vm.SalesOrderDescription.salesOrderDesc.push({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
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


        vm.QuotationSubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.SalesOrderDescription.salesOrderDesc, function (item, key) {
                total += (item.Quantity * (item.UnitPrice - item.Discount));
            });
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

            });

        }

        GetLanguage();
        function GetLanguage() {
            languageResource.query(function (data) {
                vm.Languages = data;
            });

        }

        GetCurrency();
        function GetCurrency() {
            currencyResource.query(function (data) {
                vm.Currencys = data;
            })

        }

        GetcountrysList();
        function GetcountrysList() {
            countryResource.query(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            });
        }

        GetProjectManagerList();
        //Get All Data List
        function GetProjectManagerList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }, function (data) {
                vm.ProjectManagers = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

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
            }
            if (activeMode == 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.ActionButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false
                vm.EditView = true;


                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.ActionButton = true;
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
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }, function (data) {
                vm.collaborators = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesOrderResource.query(function (data) {
                vm.salesOrders = data;
                toastr.success("Data Load Successful", "Form Load");

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
               
                
                
               
                vm.salesOrder.ProjectID = vm.projectSetup.ProjectID;
                vm.salesOrder.ProcesStatusID = 15;
                salesOrderResource.save(vm.salesOrder,
                    function (data, responseHeaders) {

                        vm.salesOrder = data;
                       
                        GetList();
                        toastr.success("Save Successful");
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
                    });
        }


        function SaveProjectSide( ) {
            vm.projectSide.CountryID = vm.cmbcountrys.CountryID;
            vm.projectSide.CityID = vm.cmbCitys.CityID;
            vm.projectSide.LanguageID = vm.cmbLanguages.LanguageID;
            vm.projectSide.CurrencyID = vm.cmbCurrencys.CurrencyID;

            projectSideResource.save(vm.projectSide).$promise.then(
                        function (data, responseHeaders) {
                            vm.projectSide = data;
                            vm.projectSetup.ProjectSideID = vm.projectSide.ProjectSideID;
                            SaveProjectSetup();
                        });



        };


        //Get Single Record
        vm.Get = function (id) {
            salesOrderResource.get({ 'ID': id }, function (salesOrder) {
                vm.salesOrder = salesOrder;
                vm.GetProjectSetup(vm.salesOrder.ProjectID);

                vm.cmbCustomer = { CollaboratorID: vm.salesOrder.CustomerID }

                if (vm.salesOrder.ProcesStatusID == 14) {
                    vm.GetSalesQuotationDescription(vm.salesOrder.SalesQuotationID);
                }
                else {
                    vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
                }
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }, function (data) {
                vm.SalesOrderDescription.salesOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        vm.GetSalesQuotationDescription = function (salesQuotationID) {

            salesQuotationDescriptionResource.query({ '$filter': 'SalesQuotationID eq ' + salesQuotationID }, function (data) {
                vm.SalesOrderDescription.salesOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        //Get Single Record
        vm.GetProjectSide = function (id) {
            projectSideResource.get({ 'ID': id }, function (projectSide) {
                vm.projectSide = projectSide;
                vm.cmbcountrys = { CountryID: vm.projectSide.CountryID };
                vm.selectCity(vm.projectSide.CountryID);
                vm.cmbCitys = { CityID: vm.companyBranch.CityID };
                vm.cmbLanguages = { LanguageID: vm.projectSide.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.projectSide.CurrencyID };

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }
        //Get Single Record
        vm.GetProjectSetup = function (id) {
            projectSetupResource.get({ 'ID': id }, function (projectSetup) {
                vm.projectSetup = projectSetup;
                vm.HasProjectSide = (vm.projectSetup.ProjectSideID == null ? false : true);
                vm.GetProjectSide(vm.projectSetup.ProjectSideID);
                toastr.success("Data Load Successful", "Form Load");
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
                salesOrderResource.update({ 'ID': vm.salesOrder.SalesOrderID }, vm.salesOrder);
                vm.UpdateProjectSetup();
                vm.salesOrders = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Update
        vm.UpdateProjectSetup = function () {

            projectSetupResource.update({ 'ID': vm.projectSetup.ProjectID }, vm.projectSetup);

        }

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
        vm.Delete = function () {
            vm.salesOrder.$delete({ 'ID': vm.salesOrder.SalesOrderID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }
}());