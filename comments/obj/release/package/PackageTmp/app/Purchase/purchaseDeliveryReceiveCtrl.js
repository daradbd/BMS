(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseDeliveryReceiveresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseDeliveryReceiveResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseDeliveryReceiveCtrl", ["purchaseDeliveryReceiveDescriptionResource", "collaboratorResource", "projectSetupResource", "purchaseOrderCategoryResource", "purchaseOrderDescriptionResource", "purchaseOrderResource", "purchaseDeliveryReceiveResource", "$filter", "$rootScope", "$state", "appAuth", purchaseDeliveryReceiveCtrl]);
    function purchaseDeliveryReceiveCtrl(purchaseDeliveryReceiveDescriptionResource, collaboratorResource, projectSetupResource, purchaseOrderCategoryResource, purchaseOrderDescriptionResource, purchaseOrderResource, purchaseDeliveryReceiveResource, $filter, $rootScope, $state, appAuth) {
        var vm = this;
        vm.purchaseDeliveryReceives = [];
        vm.purchaseOrders = [];
        vm.PurchaseOrderDescription = [];
        vm.PurchaseDeliveryReceiveDescription = [];
        appAuth.checkPermission();

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


        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.purchaseDeliveryReceive = null;
                vm.PurchaseDeliveryReceiveDescription = null;
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


                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.CancelButton = true;
                vm.ActionButton = false;
            }
        }
        vm.QuotationSubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.PurchaseOrderDescription, function (item, key) {
               
                    total += (item.Quantity * item.UnitPrice);
                
                
            });
            return total;
        }
        vm.PurchaseSubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.PurchaseOrderDescription, function (item, key) {
                
                    if ((item.Quantity - item.ReceivedQuantity) < $filter('isNull')(item.ReceiveQuantity,0)) {
                        item.ReceiveQuantity = "";
                    }
                    total += ($filter('isNull')(item.PurPrice,0) * $filter('isNull')(item.ReceiveQuantity,0));
                
                   
                
                
            });
            return total;
        }

        vm.PurchaseReceiveSubTotal = function () {
            var total = 0.00;
            angular.forEach(vm.PurchaseDeliveryReceiveDescription, function (item, key) {

                
                total += ($filter('isNull')(item.UnitPrice, 0) * $filter('isNull')(item.Quantity, 0));




            });
            return total;
        }

        var DispayButton = function () {

        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }
        vm.PurchaseBill = function (PReceiveID) {
            $rootScope.PReceiveID = PReceiveID;
            $state.go('purchaseBill');
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

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;
                toastr.success("Data Load Successful", "Form Load");

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

        GetPurchaseOrderList();

        //Get All Data List
        function GetPurchaseOrderList() {
            purchaseOrderResource.query().$promise.then(function (data) {
                vm.purchaseOrders = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetList();

        //Get All Data List
        function GetList() {
            purchaseDeliveryReceiveResource.query().$promise.then(function (data) {
                vm.purchaseDeliveryReceives = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseDeliveryReceive
        vm.Save = function (isValid) {
            if (isValid) {
                vm.purchaseDeliveryReceive.PurchaseOrderID = vm.purchaseOrder.PurchaseOrderID;
                vm.purchaseDeliveryReceive.PurchaseOrderCode = vm.purchaseOrder.PurchaseOrderCode;
               // vm.purchaseDeliveryReceive.PurchaseOrderCategoryID = vm.cmbPurchaseOrderCategory.PurchaseOrderCategoryID;
                vm.purchaseDeliveryReceive.ProjectID = vm.cmbProject.ProjectID;
                vm.purchaseDeliveryReceive.PurchasePersonID = vm.cmbEmployee.CollaboratorID;
                vm.purchaseDeliveryReceive.SupplierID = vm.cmbSupplier.CollaboratorID;
               // vm.purchaseDeliveryReceive.IsBilled = false;

                purchaseDeliveryReceiveResource.save(vm.purchaseDeliveryReceive).$promise.then(
                    function (data, responseHeaders) {
                        vm.purchaseDeliveryReceive = data;
                        vm.SaveDeliveryReceive();
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

        //Save Quotation Description
        vm.SaveDeliveryReceive = function () {

            angular.forEach(vm.PurchaseOrderDescription, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var DeliveryReceiveInfo = {
                    PurchaseDeliveryReceiveDescriptionID: value.PurchaseDeliveryReceiveDescriptionID,
                    PurchaseDeliveryReceiveID: vm.purchaseDeliveryReceive.PurchaseDeliveryReceiveID,
                    PurchaseOrderID: vm.purchaseDeliveryReceive.PurchaseOrderID,
                    SupplierID: vm.purchaseDeliveryReceive.SupplierID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    UOMID: value.UOMID,
                    Quantity: value.ReceiveQuantity,
                    UnitPrice: value.PurPrice,
                    // Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    //Discount: value.Discount,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                purchaseDeliveryReceiveDescriptionResource.save(DeliveryReceiveInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })


        }

        //Get Single Record
        vm.Get = function (id) {
            purchaseDeliveryReceiveResource.get({ 'ID': id }).$promise.then(function (purchaseDeliveryReceive) {
                vm.purchaseDeliveryReceive = purchaseDeliveryReceive;

                vm.cmbSupplier = vm.purchaseDeliveryReceive.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseDeliveryReceive.ProjectID };
                vm.cmbPurchaseOrderCategory = { PurchaseOrderCategoryID: vm.purchaseDeliveryReceive.PurchaseOrderCategoryID };
                vm.GetPurchaseDeliveryReceiveDescription(vm.purchaseDeliveryReceive.PurchaseDeliveryReceiveID);
                vm.ViewMode(3);
               // toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Get Single Record
        vm.GetpurchaseOrder = function (id) {
            purchaseOrderResource.get({ 'ID': id }).$promise.then(function (purchaseOrder) {
                vm.purchaseOrder = purchaseOrder;

                vm.cmbSupplier = { CollaboratorID: vm.purchaseOrder.SupplierID };
                vm.cmbSupplier = vm.purchaseOrder.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseOrder.ProjectID };
                vm.cmbPurchaseOrderCategory = { PurchaseOrderCategoryID: vm.purchaseOrder.PurchaseOrderCategoryID };
                //if (vm.purchaseOrder.ProcesStatusID == 10) {
                //    vm.GetMaintainPurchaseQuotationDescription(vm.purchaseOrder.MaintainPurchaseQuotationID);
                //}
                //else {
                    vm.GetPurchaseOrderDescription(vm.purchaseOrder.PurchaseOrderID);
                //}
                vm.ViewMode(4);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetPurchaseOrderDescription = function (purchaseOrderID) {

            purchaseOrderDescriptionResource.query({ '$filter': 'PurchaseOrderID eq ' + purchaseOrderID }).$promise.then(function (data) {
                vm.PurchaseOrderDescription = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetPurchaseDeliveryReceiveDescription = function (PurchaseDeliveryReceiveID) {

            purchaseDeliveryReceiveDescriptionResource.query({ '$filter': 'PurchaseDeliveryReceiveID eq ' + PurchaseDeliveryReceiveID }).$promise.then(function (data) {
                vm.PurchaseDeliveryReceiveDescription = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                purchaseDeliveryReceiveResource.update({ 'ID': vm.purchaseDeliveryReceive.PurchaseDeliveryReceiveID }, vm.purchaseDeliveryReceive).$promise.then(function () {
                vm.purchaseDeliveryReceives = null;
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
          //  vm.purchaseDeliveryReceive.$delete({ 'ID': vm.purchaseDeliveryReceive.PurchaseDeliveryReceiveID });
            purchaseDeliveryReceiveResource.delete({ 'ID': vm.purchaseDeliveryReceive.PurchaseDeliveryReceiveID }).$promise.then(function (data) {
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