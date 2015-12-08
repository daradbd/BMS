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
        .controller("salesBillCtrl", ["salesBillCategoryResource","unitOfMeasureResource", "currencyResource", "languageResource", "countryResource", "cityResource", "projectSideResource", "projectSetupResource", "salesQuotationDescriptionResource", "$rootScope", "$state", "salesOrderDescriptionResource", "productResource", "collaboratorResource", "salesOrderResource", "salesBillDescriptionResource", "salesBillResource", salesBillCtrl]);
    function salesBillCtrl(salesBillCategoryResource,unitOfMeasureResource, currencyResource, languageResource, countryResource, cityResource, projectSideResource, projectSetupResource, salesQuotationDescriptionResource, $rootScope, $state, salesOrderDescriptionResource, productResource, collaboratorResource, salesOrderResource, salesBillDescriptionResource, salesBillResource) {

        var vm = this;

        vm.Totaltax = 0.00;
        vm.TotlaDiscount = 0.00;
        vm.GTotal = 0.00;
        vm.Shipping = 0.00;


        vm.salesBills = [];
        vm.salesOrders = []
        vm.salesBillCategorys = [];
        vm.collaborators = [];
        vm.products = [];
        vm.companyBranch = [];
        vm.salesBill = {};

        vm.SalesBillDescription = { salesBillDesc: [{ SalesSectionID: 1, SalesSectionName: '', ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

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
        vm.CancelButton = false;


        if ($rootScope.SOrderID > 0) {
            GetSalesOrder($rootScope.SOrderID);
            $rootScope.SOrderID = 0;
        }

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }).$promise.then(function (data) {
                vm.citys = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        vm.addItem = function (SalesSectionID, SalesSectionName) {

            vm.SalesBillDescription.salesBillDesc.unshift({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });

        }
        vm.PushItem = function (SalesSectionID, SalesSectionName) {

            vm.SalesBillDescription.salesBillDesc.push({ SalesSectionID: SalesSectionID, SalesSectionName: SalesSectionName, ProductID: 0, Description: "", MOUID: 0, ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });

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
            var Totaltax = 0.00;
            var TotlaDiscount = 0.00;

            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (item, key) {
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


        GetSalesBillCategoryList();
        function GetSalesBillCategoryList() {
            salesBillCategoryResource.query().$promise.then(function (data) {
                vm.salesBillCategorys = data;
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
               // vm.salesBill = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
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
                vm.CancelButton = false;
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
                vm.CancelButton = true;
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
                vm.CancelButton = true;
            }
        }

        var DispayButton = function () {

        }
        vm.UpdatePercentage = function (Value, KeyName) {
            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (item, key) {

                item[KeyName] = Value;


            });

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
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
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


        GetList();

        //Get All Data List
        function GetList() {
            salesBillResource.query().$promise.then(function (data) {
                vm.salesBills = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salesBill
        vm.Save = function (isValid) {
            if (isValid) {
                vm.salesBill.GrandTotal = vm.GTotal;
                vm.salesBill.Shipping = vm.Shipping;
                vm.salesBill.TaxAmount = vm.Totaltax;
                vm.salesBill.DiscountAmount =vm.TotlaDiscount;

                salesBillResource.save(vm.salesBill).$promise.then(
                    function (data, responseHeaders) {
                        vm.salesBill = data;
                        vm.SaveBill();
                       // GetList();
                        vm.salesBill = null;
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

        //Save Order Description
        vm.SaveBill = function () {


            angular.forEach(vm.SalesBillDescription.salesBillDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var salesBillInfo = {
                    SalesBillDescriptionID: value.SalesBillDescriptionID,
                    SalesOrderID: vm.salesBill.SalesOrderID,
                    SalesBillID: vm.salesBill.SalesBillID,
                    CustomerID: vm.salesBill.CustomerID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    UOMID: value.UOMID,
                    BillQuantity: value.BillQuantity,
                    UnitPrice: value.UnitPrice,
                    Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    SalesSectionID: value.SalesSectionID,
                    SalesSectionName: value.SalesSectionName,
                    Discount: value.Discount,
                };

                salesBillDescriptionResource.save(salesBillInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })


        }
        //Get Single Record
        vm.Get = function (id) {
            salesBillResource.get({ 'ID': id }).$promise.then(function (salesBill) {
                vm.salesBill = salesBill;
                vm.Shipping = vm.salesBill.Shipping;
                vm.cmbCustomer = vm.salesBill.Collaborator;
                vm.cmbSalesBillCategory = { SalesBillCategoryID: vm.salesBill.SalesBillCategoryID };

                vm.GetSalesBillDescription(id);
                vm.ViewMode(3);
               // toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetSalesBillDescription = function (salesBillID) {

            salesBillDescriptionResource.query({ '$filter': 'SalesBillID eq ' + salesBillID }).$promise.then(function (data) {

                // vm.SalesOrderDescription.salesOrderDesc = data;
                vm.SalesBillDescription.salesBillDesc = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }


        //Get Single Record
       function GetSalesOrder(id) {

           salesOrderResource.get({ 'ID': id }).$promise.then(function (salesOrder) {

                vm.salesOrder = salesOrder;
                //vm.cmbCustomer = { CollaboratorID: vm.salesBill.CustomerID }
                vm.cmbCustomer = vm.salesOrder.Collaborator;

                vm.cmbSalesBillCategory = { SalesBillCategoryID: vm.salesBill.SalesBillCategoryID };
                vm.salesBill.CustomerID = vm.salesOrder.CustomerID;
                vm.salesBill.SalesOrderID = vm.salesOrder.SalesOrderID;
                vm.salesBill.ProjectID = vm.salesOrder.ProjectID;
                vm.salesBill.SalesOrderCode = vm.salesOrder.SalesOrderCode;
               // vm.GetProjectSetup(vm.salesOrder.ProjectID);
               
                vm.GetSalesOrderDescription(vm.salesOrder.SalesOrderID);
               //vm.ViewMode(1);
               // toastr.success("Data Load Successful", "Form Load");

           }, function (error) {
               // error handler
               toastr.error("Data Load Failed!");
           });
        }


        vm.GetSalesOrderDescription = function (salesOrderID) {

            salesOrderDescriptionResource.query({ '$filter': 'SalesOrderID eq ' + salesOrderID }).$promise.then(function (data) {

               // vm.SalesOrderDescription.salesOrderDesc = data;
                vm.SalesBillDescription.salesBillDesc = data;
                //toastr.success("Data function Load Successful", "Form Load");
                vm.ViewMode(1);
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.salesBill.GrandTotal = vm.GTotal;
                vm.salesBill.Shipping = vm.Shipping;
                vm.salesBill.TaxAmount = vm.Totaltax;
                vm.salesBill.DiscountAmount = vm.TotlaDiscount;
                salesBillResource.update({ 'ID': vm.salesBill.SalesBillID }, vm.salesBill);
                vm.SaveBill();
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

            vm.salesBill.$delete({ 'ID': vm.salesBill.SalesBillID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);

        }

    }

}());