(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesBillresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesBillResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesBillCtrl", ["currencyResource", "languageResource", "countryResource", "cityResource", "projectSideResource", "projectSetupResource", "salesQuotationDescriptionResource", "$rootScope", "$state", "salesOrderDescriptionResource", "productResource", "collaboratorResource", "salesOrderResource", "salesBillDescriptionResource", "salesBillResource", salesBillCtrl]);
    function salesBillCtrl(currencyResource, languageResource, countryResource, cityResource, projectSideResource, projectSetupResource, salesQuotationDescriptionResource, $rootScope, $state, salesOrderDescriptionResource, productResource, collaboratorResource,salesOrderResource,salesBillDescriptionResource, salesBillResource) {

        var vm = this;
        vm.salesBills = [];
        vm.salesOrders = []
        vm.collaborators = [];
        vm.products = [];
        vm.companyBranch = [];
        vm.salesBill = {};

        vm.SalesBillDescription = { salesBillDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

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


        if ($rootScope.SOrderID > 0) {
            GetSalesOrder($rootScope.SOrderID);
            $rootScope.SOrderID = 0;
        }

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }

        vm.addItem = function (SalesSectionID, SalesSectionName) {

            vm.SalesBillDescription.salesBillDesc.unshift({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });

        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {

            vm.SalesBillDescription.salesBillDesc.push({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });

        }
        vm.removeItem = function (item)
        {


            vm.SalesBillDescription.salesBillDesc.splice(vm.SalesBillDescription.salesBillDesc.indexOf(item), 1);

        }
        vm.updateItem = function (item)
        {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = 0;//item.cmbProductID.SalePrice;

        }

        vm.ssopen = function (item, $event)
        {

            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }
        vm.sopen = function ($event)
        {

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
            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (item, key) {
                total += (item.Quantity * (item.UnitPrice - item.Discount));
            });
            return total;
        }

        vm.SectionSubTotal = function (SectionID) {
            var total = 0.00;
            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (item, key) {
                if (item.SalesSectionID == SectionID) {
                    total += (item.Quantity * (item.UnitPrice - item.Discount));
                }

            });
            return total;
        }

        vm.UpdateSectionName = function (SectionID, SalesSectionName) {
            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (item, key) {
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
               // vm.salesBill = null;
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
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
            }
        }

        var DispayButton = function () {

        }

        //vm.RemainQuantity = function (item) {
        //    return item.Quantity - ((item.BillQuantity == null ? 0 : item.BillQuantity) + ((angular.isUndefined(item.RDQuantity) || item.RDQuantity === null) == true ? 0 : item.RDQuantity));
        //}

        vm.CheckMax = function (item) {
            item.BillQuantity = (item.Quantity - item.BillQuantity) < item.BillQuantity ? (item.Quantity - item.BillQuantity) : item.BillQuantity;
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
            salesBillResource.query(function (data) {
                vm.salesBills = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save salesBill
        vm.Save = function (isValid) {
            if (isValid) {
                salesBillResource.save(vm.salesBill,
                    function (data, responseHeaders) {
                        vm.SaveBill();
                        GetList();
                        vm.salesBill = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Save Order Description
        vm.SaveBill = function () {


            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var salesBillInfo = {
                    SalesBillDescriptionID: value.SalesBillDescriptionID,
                    SalesOrderID: vm.salesBill.SalesOrderID,
                    CustomerID: vm.salesBill.CustomerID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    BillQuantity: value.BillQuantity,
                    UnitPrice: value.UnitPrice,
                    Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    Discount: value.Discount,
                };

                salesBillDescriptionResource.save(salesBillInfo,
                function (data, responseHeaders) {

                });
            })


        }
        //Get Single Record
        vm.Get = function (id) {
            salesBillResource.get({ 'ID': id }, function (salesBill) {
                vm.salesBill = salesBill;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }



        //Get Single Record
       function GetSalesOrder(id) {

            salesOrderResource.get({ 'ID': id }, function (salesOrder) {

                vm.salesOrder = salesOrder;
                vm.salesBill.CustomerID = vm.salesOrder.CustomerID;
                vm.salesBill.SalesOrderID = vm.salesOrder.SalesOrderID;
                vm.salesBill.ProjectID = vm.salesOrder.ProjectID;
                vm.salesBill.SalesOrderCode = vm.salesOrder.SalesOrderCode;
               // vm.GetProjectSetup(vm.salesOrder.ProjectID);
                vm.cmbCustomer = { CollaboratorID: vm.salesBill.CustomerID }
                vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
                vm.ViewMode(1);
                toastr.success("Data Load Successful", "Form Load");

            });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }, function (data) {

               // vm.SalesOrderDescription.salesOrderDesc = data;
                vm.SalesBillDescription.salesBillDesc = data;
                toastr.success("Data function Load Successful", "Form Load");

            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {

                salesBillResource.update({ 'ID': vm.salesBill.salesBillID }, vm.salesBill);
                vm.salesBills = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");

            }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function () {

            vm.salesBill.$delete({ 'ID': vm.salesBill.salesBillID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);

        }

    }

}());