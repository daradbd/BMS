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
        .controller("purchaseOrderCtrl", ["purchaseOrderCategoryResource", "unitOfMeasureResource", "maintainPurchaseQuotationDescriptionResource", "projectSetupResource", "purchaseOrderDescriptionResource", "productResource", "collaboratorResource", "$rootScope", "$state", "purchaseOrderResource", "appAuth", purchaseOrderCtrl]);
    function purchaseOrderCtrl(purchaseOrderCategoryResource, unitOfMeasureResource, maintainPurchaseQuotationDescriptionResource, projectSetupResource, purchaseOrderDescriptionResource, productResource, collaboratorResource, $rootScope, $state, purchaseOrderResource, appAuth)
    {
        var vm = this;
        vm.purchaseOrders = [];
        vm.Suppliers = [];
        vm.products = [];
        vm.purchaseOrderCategorys  = [];
        appAuth.checkPermission();

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
        vm.CancelButton = false;
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
                vm.CancelButton = true;
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
                vm.CancelButton = false;
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
                vm.CancelButton = true;
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
                vm.CancelButton = true;
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


        GetpurchaseOrderCategoryList();
        //Get All Data List
        function GetpurchaseOrderCategoryList() {
            purchaseOrderCategoryResource.query().$promise.then(function (data) {
                vm.purchaseOrderCategorys = data;
               

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
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

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProductList();
        //Get All Data List
        function GetProductList() {
            productResource.query({ '$filter': 'IsRawmaterial eq true' }).$promise.then(function (data) {
                vm.products = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetSupplierList();
        //Get All Data List
        function GetSupplierList() {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }).$promise.then(function (data) {
                vm.Suppliers = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseOrderResource.query().$promise.then(function (data) {
                vm.purchaseOrders = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseOrder
        vm.Save = function (isValid) {
            if (isValid) {
                purchaseOrderResource.save(vm.purchaseOrder).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseOrder = data;
                        vm.SavePurchaseOrder();
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
                    UOMID: value.UOMID,
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

                purchaseOrderDescriptionResource.save(PurchaseOrderInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })


        }



        //Get Single Record
        vm.Get = function (id) {
            purchaseOrderResource.get({ 'ID': id }).$promise.then(function (purchaseOrder) {
                vm.purchaseOrder = purchaseOrder;

                //vm.cmbSupplier = { CollaboratorID: vm.purchaseOrder.SupplierID };
                vm.cmbSupplier = vm.purchaseOrder.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseOrder.ProjectID };
                vm.cmbPurchaseOrderCategory = { PurchaseOrderCategoryID: vm.purchaseOrder.PurchaseOrderCategoryID };
                if (vm.purchaseOrder.ProcesStatusID == 10) {
                    vm.GetMaintainPurchaseQuotationDescription(vm.purchaseOrder.MaintainPurchaseQuotationID);
                }
                else {
                    vm.GetPurchaseOrderDescription(vm.purchaseOrder.PurchaseOrderID);
                }
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetMaintainPurchaseQuotationDescription = function (maintainPurchaseQuotationID) {

            maintainPurchaseQuotationDescriptionResource.query({ '$filter': 'MaintainPurchaseQuotationID eq ' + maintainPurchaseQuotationID }).$promise.then(function (data) {
                vm.PurchaseOrderDescription.PurchaseOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetPurchaseOrderDescription = function (purchaseOrderID) {

            purchaseOrderDescriptionResource.query({ '$filter': 'PurchaseOrderID eq ' + purchaseOrderID }).$promise.then(function (data) {
                vm.PurchaseOrderDescription.PurchaseOrderDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                if (vm.purchaseOrder.ProcesStatusID == 10) {
                    vm.purchaseOrder.ProcesStatusID = 11;
                }
                purchaseOrderResource.update({ 'ID': vm.purchaseOrder.PurchaseOrderID }, vm.purchaseOrder).$promise.then(function () {
                vm.SavePurchaseOrder();
                vm.purchaseOrders = null;
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

        //Data Delete
        vm.Delete = function () {
            //vm.purchaseOrder.$delete({ 'ID': vm.purchaseOrder.PurchaseOrderID });
            purchaseOrderResource.delete({ 'ID': vm.purchaseOrder.PurchaseOrderID }).$promise.then(function (data) {
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