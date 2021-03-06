﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (requestForQuotationresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: requestForQuotationResource
     *  @date: 29/4/2015
     */

    angular
        .module("companyManagement")
        .controller("requestForQuotationCtrl", ["maintainPurchaseQuotationResource", "projectSetupResource", "purchaseRequisitionDescriptionResource", "requestForQuotationDescriptionResource", "productResource", "collaboratorResource", "$rootScope", "$state", "requestForQuotationResource", "appAuth", requestForQuotationCtrl]);
    function requestForQuotationCtrl(maintainPurchaseQuotationResource, projectSetupResource, purchaseRequisitionDescriptionResource, requestForQuotationDescriptionResource, productResource, collaboratorResource, $rootScope, $state, requestForQuotationResource, appAuth) {
        var vm = this;
        vm.requestForQuotations = [];
       // vm.maintainPurchaseQuotation = [];
        vm.collaborators = [];
        vm.Employees = [];
        vm.products = [];
        appAuth.checkPermission();

        vm.requestForQuotationDescription = { requestForQuotationDesc: [{ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 }] };
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false;
        vm.EditView = false;
        vm.RFQuotationButton = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.CancelButton = false;
        vm.AcceptRequisitionButton = false;
        vm.ActionButton = false;

        vm.addItem = function () {
            vm.requestForQuotationDescription.requestForQuotationDesc.unshift({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 });
        }
        vm.PushItem = function () {
            vm.requestForQuotationDescription.requestForQuotationDesc.push({ ProductID: 0, Description: "", ScheduleDate: "", sopened: false, Quantity: 1 });
        }
        vm.removeItem = function (item) {
            vm.requestForQuotationDescription.requestForQuotationDesc.splice(vm.requestForQuotationDescription.requestForQuotationDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
            item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            item.ProductID = item.cmbProductID.ProductID;
            //item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.sopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.requestForQuotation = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;


                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
                vm.AcceptRequisitionButton = false;
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
                vm.AcceptRequisitionButton = false;
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
                vm.CancelButton = true;
                vm.AcceptRequisitionButton = (vm.requestForQuotation.ProcesStatusID == 4 ? true : false);
                vm.ActionButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.RFQuotationButton = (vm.requestForQuotation.ProcesStatusID == 4 ? false : true);
                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = (vm.requestForQuotation.ProcesStatusID == 4 ? false : true);
                vm.DeleteButton = true;
                vm.CancelButton = true;
                vm.AcceptRequisitionButton = (vm.requestForQuotation.ProcesStatusID == 4 ? true : false);
                vm.ActionButton = false;
            }
        }

        vm.PurchaseOrder = function (OrderID) {
            $rootScope.POrderID = OrderID;
            $state.go('purchaseOrder');
        }

        var DispayButton = function () {

        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;
               // toastr.success("Data Load Successful", "Form Load");

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

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            requestForQuotationResource.query().$promise.then(function (data) {
                vm.requestForQuotations = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save requestForQuotation
        vm.Save = function (isValid) {
            if (isValid) {
                requestForQuotationResource.save(vm.requestForQuotation).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.requestForQuotation = data;
                        vm.SaveRequestForQuotation();
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
        vm.SaveRequestForQuotation = function () {

            angular.forEach(vm.requestForQuotationDescription.requestForQuotationDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var RequestForQuotationInfo = {
                    RequestForQuotationID: vm.requestForQuotation.RequestForQuotationID,
                    ProductID: value.ProductID,
                    Description: value.Description,
                    Quantity: value.Quantity,
                    ScheduleDate: value.ScheduleDate,
                };
                //alert(angular.toJson(VoucherInfo));
                //alert(value.COAID);
                //vm.voucherList.COAID = value.COAID;
                //vm.voucherList.Amount = value.Amount;
                //vm.voucherList.DrCr = value.DrCr;

                requestForQuotationDescriptionResource.save(RequestForQuotationInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })


        }

        //Save maintainPurchaseQuotation
        vm.RFQuotation = function (isValid) {
            if (isValid) {
                vm.maintainPurchaseQuotation.RequestForQuotationID = vm.requestForQuotation.RequestForQuotationID;
                vm.maintainPurchaseQuotation.RequestForQuotationCode = vm.requestForQuotation.RequestForQuotationCode;
                vm.maintainPurchaseQuotation.ProjectID = vm.requestForQuotation.ProjectID;
                vm.maintainPurchaseQuotation.ProcesStatusID = 7;
                maintainPurchaseQuotationResource.save(vm.maintainPurchaseQuotation).$promise.then(
                    function (data, responseHeaders) {
                       // GetList();
                        vm.maintainPurchaseQuotation = data;
                       // vm.SaveMaintainPurchaseQuotation();
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

        vm.AcceptRequisition=function(){
            vm.SaveRequestForQuotation();
            vm.requestForQuotation.ProcesStatusID = 5;
            vm.Update(true);

        }

        //Get Single Record
        vm.Get = function (id) {
            requestForQuotationResource.get({ 'ID': id }).$promise.then(function (requestForQuotation) {
                vm.requestForQuotation = requestForQuotation;

                vm.cmbEmployee = { CollaboratorID: vm.requestForQuotation.EmployeeID };
                vm.cmbProject = { ProjectID: vm.requestForQuotation.ProjectID };

                if (vm.requestForQuotation.ProcesStatusID == 4)
                {
                    vm.GetRequisitionDescription(vm.requestForQuotation.RequisitionID);
                }
                else
                {
                    vm.GetRequestForQuotationDescription(vm.requestForQuotation.RequestForQuotationID);
                }
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetRequisitionDescription = function (purchaseRequisitionID) {

            purchaseRequisitionDescriptionResource.query({ '$filter': 'PurchaseRequisitionID eq ' + purchaseRequisitionID }).$promise.then(function (data) {
                vm.requestForQuotationDescription.requestForQuotationDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        vm.GetRequestForQuotationDescription = function (requestForQuotationID) {

            requestForQuotationDescriptionResource.query({ '$filter': 'RequestForQuotationID eq ' + requestForQuotationID }).$promise.then(function (data) {
                vm.requestForQuotationDescription.requestForQuotationDesc = data;
                toastr.success("Data function Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                requestForQuotationResource.update({ 'ID': vm.requestForQuotation.RequestForQuotationID }, vm.requestForQuotation).$promise.then(function () {
                vm.requestForQuotations = null;
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
            //vm.requestForQuotation.$delete({ 'ID': vm.requestForQuotation.RequestForQuotationID });
            requestForQuotationResource.delete({ 'ID': vm.requestForQuotation.RequestForQuotationID }).$promise.then(function (data) {
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