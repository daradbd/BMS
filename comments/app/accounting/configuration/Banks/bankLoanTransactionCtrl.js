﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (bankLoanTransactionresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankLoanTransactionResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("bankLoanTransactionCtrl", ["bankLoanTransactionResource", "appAuth", bankLoanTransactionCtrl]);
    function bankLoanTransactionCtrl(bankLoanTransactionResource, appAuth) {
        var vm = this;
        vm.bankLoanTransactions = [];
        // appAuth.checkPermission();
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
                vm.bankLoanTransaction = null;
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
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.CancelButton = true;
            }
            if (activeMode == 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
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


        GetList();

        //Get All Data List
        function GetList() {
            bankLoanTransactionResource.query().$promise.then(function (data) {
                vm.bankLoanTransactions = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save bankLoanTransaction
        vm.Save = function (isValid) {
            if (isValid) {
                bankLoanTransactionResource.save(vm.bankLoanTransaction).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.bankLoanTransaction = null;
                        vm.ViewMode(2);
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
            bankLoanTransactionResource.get({ 'ID': id }).$promise.then(function (bankLoanTransaction) {
                vm.bankLoanTransaction = bankLoanTransaction;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                bankLoanTransactionResource.update({ 'ID': vm.bankLoanTransaction.BankLoanTransactionID }, vm.bankLoanTransaction).$promise.then(function () {
                    vm.bankLoanTransactions = null;
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
            //vm.bankLoanTransaction.$delete({ 'ID': vm.bankLoanTransaction.BankLoanTransactionID });
            bankLoanTransactionResource.delete({ 'ID': vm.bankLoanTransaction.BankLoanTransactionID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
                vm.ViewMode(2);
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());