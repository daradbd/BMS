﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesReceivePaymentresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesReceivePaymentResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesReceivePaymentCtrl", ["ledgerSheetResource", "paymentMethodResource", "projectSetupResource", "collaboratorResource", "salesReceivePaymentResource", "appAuth", salesReceivePaymentCtrl]);
    function salesReceivePaymentCtrl(ledgerSheetResource, paymentMethodResource, projectSetupResource, collaboratorResource, salesReceivePaymentResource, appAuth) {
        var vm = this;
        vm.paymentMethods = [];
        vm.salesReceivePayments = [];
        vm.collaborators = [];
        vm.Projects = [];
        vm.Balance = 0.00;
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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.salesReceivePayment = null;
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
        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

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

        var DispayButton = function () {

        }

        vm.GetBalance = function (COAID) {

            ledgerSheetResource.query({ 'id': COAID, 'ReportType': 2 }).$promise.then(function (data) {
                vm.Balance = data[2];
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
                // console.log(JSON.stringify(vm.ledgerSheets));
            }, function (error) {
                if (error.status == 500) {
                    toastr.error("No Data Found!");
                }
                else {
                    toastr.error("Data Load Failed!");
                }
                // error handler

            });
        }

        GetPaymentMethod();
        function GetPaymentMethod() {
            paymentMethodResource.query().$promise.then(function (data) {
                vm.paymentMethods = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salesReceivePaymentResource.query().$promise.then(function (data) {
                vm.salesReceivePayments = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salesReceivePayment
        vm.Save = function (isValid) {
            if (isValid) {
                vm.salesReceivePayment.CustomerID = vm.cmbCustomer.CollaboratorID;
                salesReceivePaymentResource.save(vm.salesReceivePayment).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.salesReceivePayment = null;
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

        //Get Single Record
        vm.Get = function (id) {
            salesReceivePaymentResource.get({ 'ID': id }).$promise.then(function (salesReceivePayment) {
                vm.salesReceivePayment = salesReceivePayment;
                //vm.cmbPaymentMethod = vm.salesReceivePayment.PaymentMethod;
               // vm.cmbPaymentMethod = { PaymentMethodID: vm.salesReceivePayment.PaymentMethodID };
                //vm.cmbCustomer = { CollaboratorID: vm.salesReceivePayment.CustomerID };
                vm.cmbCustomer = vm.salesReceivePayment.Collaborator;
                vm.cmbProject = { ProjectID: vm.salesReceivePayment.ProjectID };
                vm.GetPaymentMethod(vm.salesReceivePayment.PaymentMethodID);
                vm.cmbDepositTo = { COAID: vm.salesReceivePayment.DepositTo };

                vm.ViewMode(3);
               // toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetPaymentMethod = function (id) {
            paymentMethodResource.get({ 'ID': id }).$promise.then(function (paymentMethod) {
                vm.paymentMethod = paymentMethod;
                vm.cmbPaymentMethod = vm.paymentMethod;
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.salesReceivePayment.CustomerID = vm.cmbCustomer.CollaboratorID;
                salesReceivePaymentResource.update({ 'ID': vm.salesReceivePayment.SalesReceivePaymentID }, vm.salesReceivePayment).$promise.then(function () {
                vm.salesReceivePayments = null;
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
           // vm.salesReceivePayment.$delete({ 'ID': vm.salesReceivePayment.SalesReceivePaymentID });
            salesReceivePaymentResource.delete({ 'ID': vm.salesReceivePayment.SalesReceivePaymentID }).$promise.then(function (data) {
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