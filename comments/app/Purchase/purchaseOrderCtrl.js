(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseOrderresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrderResource
     *  @date: 29/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseOrderCtrl", ["unitOfMeasureResource", "maintainPurchaseQuotationDescriptionResource", "projectSetupResource", "purchaseOrderDescriptionResource", "productResource", "collaboratorResource", "$rootScope", "$state", "purchaseOrderResource", purchaseOrderCtrl]);
    function purchaseOrderCtrl(unitOfMeasureResource, maintainPurchaseQuotationDescriptionResource, projectSetupResource, purchaseOrderDescriptionResource, productResource, collaboratorResource, $rootScope, $state, purchaseOrderResource)
    {
        var vm = this;
        vm.purchaseOrders = [];
        vm.Suppliers = [];
        vm.products = [];

        vm.PurchaseOrderDescription = { PurchaseOrderDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 }] };

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


        vm.addItem = function () {
            vm.PurchaseOrderDescription.PurchaseOrderDesc.unshift({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.PushItem = function () {
            vm.PurchaseOrderDescription.PurchaseOrderDesc.push({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1, UnitPrice: 0.0, Taxes: 0.0, Discount: 0.0 });
        }
        vm.removeItem = function (item) {
            vm.PurchaseOrderDescription.PurchaseOrderDesc.splice(vm.PurchaseOrderDescription.PurchaseOrderDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.sopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }

        vm.QuotationSubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.PurchaseOrderDescription.PurchaseOrderDesc, function (item, key) {
                total += (item.Quantity * item.UnitPrice);
            });
            return total;
        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.purchaseOrder = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.ActionButton = false;
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
                vm.ActionButton = false;
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


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
                vm.ActionButton = false;
            }
        }

        var DispayButton = function () {

        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }


        vm.PurchaseReceived = function (PurchaseOrderID)
        {
            $rootScope.POrderID = PurchaseOrderID;
            $state.go('productionOrder');
        }

        vm.PurchaseBill = function (PurchaseOrderID)
        {
            $rootScope.POrderID = PurchaseOrderID;
            $state.go('purchaseBill');
        }

        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query(function (data) {
                vm.UnitOfMeasures = data;

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

        GetSupplierList();
        //Get All Data List
        function GetSupplierList() {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }, function (data) {
                vm.Suppliers = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query(function (data) {
                vm.Projects = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseOrderResource.query(function (data) {
                vm.purchaseOrders = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save purchaseOrder
        vm.Save = function (isValid) {
            if (isValid) {
                purchaseOrderResource.save(vm.purchaseOrder,
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseOrder = data;
                        vm.SavePurchaseOrder();
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }


        //Save Quotation Description
        vm.SavePurchaseOrder = function () {

            angular.forEach(vm.PurchaseOrderDescription.PurchaseOrderDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var PurchaseOrderInfo = {
                    PurchaseOrderDescriptionID: value.PurchaseOrderDescriptionID,
                    PurchaseOrderID: vm.purchaseOrder.PurchaseOrderID,
                    SupplierID: vm.purchaseOrder.SupplierID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    MOUID: value.MOUID,
                    Quantity: value.Quantity,
                    UnitPrice: value.UnitPrice,
                   // Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    //Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                purchaseOrderDescriptionResource.save(PurchaseOrderInfo,
                function (data, responseHeaders) {

                });
            })


        }



        //Get Single Record
        vm.Get = function (id) {
            purchaseOrderResource.get({ 'ID': id }, function (purchaseOrder) {
                vm.purchaseOrder = purchaseOrder;

                //vm.cmbSupplier = { CollaboratorID: vm.purchaseOrder.SupplierID };
                vm.cmbSupplier = vm.purchaseOrder.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseOrder.ProjectID };

                if (vm.purchaseOrder.ProcesStatusID == 10) {
                    vm.GetMaintainPurchaseQuotationDescription(vm.purchaseOrder.MaintainPurchaseQuotationID);
                }
                else {
                    vm.GetPurchaseOrderDescription(vm.purchaseOrder.PurchaseOrderID);
                }
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetMaintainPurchaseQuotationDescription = function (maintainPurchaseQuotationID) {

            maintainPurchaseQuotationDescriptionResource.query({ '$filter': 'MaintainPurchaseQuotationID eq ' + maintainPurchaseQuotationID }, function (data) {
                vm.PurchaseOrderDescription.PurchaseOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        vm.GetPurchaseOrderDescription = function (purchaseOrderID) {

            purchaseOrderDescriptionResource.query({ '$filter': 'PurchaseOrderID eq ' + purchaseOrderID }, function (data) {
                vm.PurchaseOrderDescription.PurchaseOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                if (vm.purchaseOrder.ProcesStatusID == 10) {
                    vm.purchaseOrder.ProcesStatusID = 11;
                }
                purchaseOrderResource.update({ 'ID': vm.purchaseOrder.PurchaseOrderID }, vm.purchaseOrder);
                vm.SavePurchaseOrder();
                vm.purchaseOrders = null;
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
            vm.purchaseOrder.$delete({ 'ID': vm.purchaseOrder.PurchaseOrderID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());