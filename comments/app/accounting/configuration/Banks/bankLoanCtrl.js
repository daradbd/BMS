﻿(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (bankLoanresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankLoanResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("bankLoanCtrl", ["accCOAResource", "unitOfMeasureResource", "bankLoanTypeResource", "bankResource", "bankBranchResource", "bankLoanResource", "appAuth", bankLoanCtrl]);
    function bankLoanCtrl(accCOAResource, unitOfMeasureResource, bankLoanTypeResource, bankResource, bankBranchResource, bankLoanResource, appAuth) {
        var vm = this;
        vm.bankLoans = [];
        vm.banks = [];
        vm.bankBranchs = [];
        vm.bankLoanTypes = [];
        vm.unitOfMeasures = [];
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
                vm.bankLoan = null;
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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }
        GetUOMList();

        //Get All Data List
        function GetUOMList() {
            unitOfMeasureResource.query({'$filter': 'UOMCategoryID eq 3'}).$promise.then(function (data) {
                vm.unitOfMeasures = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetBankLoanTypeList();

        //Get All Data List
        function GetBankLoanTypeList() {
            bankLoanTypeResource.query().$promise.then(function (data) {
                vm.bankLoanTypes = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetBankList();
        function GetBankList() {
            bankResource.query().$promise.then(function (data) {
                vm.banks = data;
                toastr.success("Load banks", "Country banks");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetbankBranchList();
        function GetbankBranchList() {
            bankBranchResource.query().$promise.then(function (data) {
                vm.bankBranchs = data;
                toastr.success("Load BankBranch", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetaccCOAList();

        //Get All Data List
        function GetaccCOAList() {
            accCOAResource.query({ '$filter': 'HasChild eq false' }).$promise.then(function (data) {
                vm.accCOAs = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            bankLoanResource.query().$promise.then(function (data) {
                vm.bankLoans = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save bankLoan
        vm.Save = function (isValid) {
            if (isValid) {
                bankLoanResource.save(vm.bankLoan).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.bankLoan = null;
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
            bankLoanResource.get({ 'ID': id }).$promise.then(function (bankLoan) {
                vm.bankLoan = bankLoan;
                vm.cmbBanks = { BankID: vm.bankLoan.BankID};
                vm.cmbBankBranchs = { BankBranchID: vm.bankLoan.BankBranchID};
                vm.cmbTermsUOMs = { UnitOfMeasureID: vm.bankLoan.TermsUOMID};
                vm.cmbPaymentPeriodUOMs = { UnitOfMeasureID: vm.bankLoan.PaymentPeriodUOMID};
                vm.cmbLiabilityCOAID = { COAID: vm.bankLoan.LiabilityCOAID};
                vm.cmbAssetCOAID = { COAID: vm.bankLoan.AssetCOAID };
                vm.cmbBankLoanType = { BankLoanTypeID: vm.bankLoan.BankLoanTypeID };
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
                bankLoanResource.update({ 'ID': vm.bankLoan.BankLoanID }, vm.bankLoan).$promise.then(function () {
                    vm.bankLoans = null;
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
            //vm.bankLoan.$delete({ 'ID': vm.bankLoan.BankLoanIDID });
            bankLoanResource.delete({ 'ID': vm.bankLoan.BankLoanID }).$promise.then(function (data) {
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