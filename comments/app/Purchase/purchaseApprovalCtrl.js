﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseApprovalresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrderResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseApprovalCtrl", ["collaboratorResource", "purchasePermitResource", "purchasePermitDescriptionResource", "purchaseOrderResource", "purchaseOrderDescriptionResource", "appAuth", purchaseApprovalCtrl]);
    function purchaseApprovalCtrl(collaboratorResource, purchasePermitResource, purchasePermitDescriptionResource, purchaseOrderResource, purchaseOrderDescriptionResource, appAuth) {
        var vm = this;
        vm.purchaseOrders = [];
        vm.purchasePermits = [];
        vm.purchasePermit = {};
        vm.PurchaseOrderDescription = [];
        vm.purchasePermitDescription = [];
        appAuth.checkPermission();

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
        vm.CancelButton = false;

        vm.PurchaseOrderDescription = [];

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                // vm.purchaseOrder = null;
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
                vm.DetailsView = false;
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
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = false;
                vm.CancelButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
            }
        }


        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        var DispayButton = function () {

        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseOrderResource.query({ '$filter': 'IsPermited eq false' }).$promise.then(function (data) {
                vm.purchaseOrders = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

            purchasePermitResource.query().$promise.then(function (data) {
                vm.purchasePermits = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        //Save purchaseOrder
        vm.Save = function (isValid) {
            if (isValid) {
                purchasePermitResource.save(vm.purchasePermit).$promise.then(
                    function (data, responseHeaders) {
                        vm.purchasePermit = data;
                        vm.SavePurchaseOrderPermit();
                        GetList();
                        vm.purchasePermit = null;
                        vm.cmbEmployee = {};
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

        vm.SavePurchaseOrderPermit = function () {

            angular.forEach(vm.PurchaseOrderDescription, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var PurchaseOrderInfo = {
                    //PurchaseOrderDescriptionID: value.PurchaseOrderDescriptionID,
                    PurchasePermitID: vm.purchasePermit.PurchasePermitID,
                    PurchaseOrderID: value.PurchaseOrderID,
                    SupplierID: value.SupplierID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    UOMID: value.UOMID,
                    Quantity: value.Quantity,
                    UnitPrice: value.UnitPrice,
                    PreviousDate: value.PreviousDate,
                    PreviousPrice: value.PreviousPrice,
                    ReceivedQuantity: value.ReceivedQuantity,
                    ApproxPrice: value.ApproxPrice

                    // Taxes: value.Taxes,
                    //ScheduleDate: value.ScheduleDate,
                    //Discount: value.Discount,
                };

                purchasePermitDescriptionResource.save(PurchaseOrderInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Save Failed!");
                });
            })

            vm.PurchaseOrderDescription = null;
        }

        vm.change = function (purchaseOrder) {
            if (purchaseOrder.StatusID == true) {
                vm.GetPurchaseOrderDescription(purchaseOrder.PurchaseOrderID);

            }
            else {
                vm.RemoveItem(purchaseOrder.PurchaseOrderID);
            }
            //alert(purchaseOrder.PurchaseOrderID);
        }

        vm.RemoveItem = function (PurchaseOrderID) {
            var i;
            for (i = vm.PurchaseOrderDescription.length - 1; i >= 0; i -= 1) {
                if (vm.PurchaseOrderDescription[i].PurchaseOrderID == PurchaseOrderID) {
                    vm.PurchaseOrderDescription.splice(i, 1);
                }

            }

        }


        vm.GetPurchaseOrderDescription = function (purchaseOrderID) {

            purchaseOrderDescriptionResource.query({ '$filter': 'PurchaseOrderID eq ' + purchaseOrderID }).$promise.then(function (data) {
                // vm.PurchaseOrderDescription.PurchaseOrderDesc.concat(data);
                // angular.extend(vm.PurchaseOrderDescription.PurchaseOrderDesc, data);
                for (var i = 0; i < data.length; i++) {
                    vm.PurchaseOrderDescription.push(data[i]);
                }
                //return vm.PurchaseOrderDescription.PurchaseOrderDesc;
                // toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        //Get Single Record
        vm.Get = function (id) {
            purchasePermitResource.get({ 'ID': id }, function (purchasePermit) {
                vm.purchasePermit = purchasePermit;
                vm.GetPurchasePermitDescription(vm.purchasePermit.PurchasePermitID)
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetPurchasePermitDescription = function (purchasePermitID) {

            purchasePermitDescriptionResource.query({ '$filter': 'PurchasePermitID eq ' + purchasePermitID }).$promise.then(function (data) {
                vm.purchasePermitDescription = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.purchasePermit.IsApproved = true;
                purchasePermitResource.update({ 'ID': vm.purchasePermit.PurchasePermitID }, vm.purchasePermit).$promise.then(function () {
                vm.purchasePermit = null;
                vm.ViewMode(2);
                GetList();
                toastr.success("Data Approve Successful", "Form Update");
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
            vm.purchaseOrder.$delete({ 'ID': vm.purchaseOrder.purchaseOrderID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());