(function ()
{
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (bankAccountresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankAccountResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("bankAccountCtrl", ["bankAccountOwnerTypeResource", "bankAccountTypeResource", "bankResource", "bankBranchResource", "bankAccountResource", "appAuth", bankAccountCtrl]);
    function bankAccountCtrl(bankAccountOwnerTypeResource, bankAccountTypeResource, bankResource, bankBranchResource, bankAccountResource, appAuth)
    {
        var vm = this;
        vm.bankAccounts = [];
        vm.banks = [];
        vm.bankBranchs = [];
        vm.bankAccountTypes = [];
        vm.bankAccountOwnerTypes = [];
        vm.isModal = false;
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


        vm.ViewMode = function (activeMode)
        {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.bankAccount = null;
                refreshForm();
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

        var DispayButton = function ()
        {

        }

        function refreshForm() {
            vm.bankAccounts = null;
            vm.cmbBankAccountTypes = null;
            vm.cmbBankBranchs = null;
            vm.cmbBanks = null;

        }
        GetBankList();
        function GetBankList()
        {
            bankResource.query().$promise.then(function (data)
            {
                vm.banks = data;
                toastr.success("Load banks", "Country banks");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetbankBranchList();
        function GetbankBranchList()
        {
            bankBranchResource.query().$promise.then(function (data)
            {
                vm.bankBranchs = data;
                toastr.success("Load BankBranch", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetbankAccountTypeList();
        function GetbankAccountTypeList()
        {
            bankAccountTypeResource.query().$promise.then(function (data)
            {
                vm.bankAccountTypes = data;
                toastr.success("Load bankAccountType", "bankAccountType Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetBankAccountOwnerTypeList();
        function GetBankAccountOwnerTypeList()
        {
            bankAccountOwnerTypeResource.query().$promise.then(function (data)
            {
                vm.bankAccountOwnerTypes = data;
                toastr.success("Load AccountOwner", "AccountOwner Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList()
        {
            bankAccountResource.query().$promise.then(function (data)
            {
                vm.bankAccounts = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save bankAccount
        vm.Save = function (isValid)
        {
            if (isValid)
            {
                bankAccountResource.save(vm.bankAccount).$promise.then(
                    function (data, responseHeaders)
                    {
                        GetList();
                        vm.bankAccount = null;
                        refreshForm();
                        vm.ViewMode(2);
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            }
            else
            {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id)
        {
            bankAccountResource.get({ 'ID': id }).$promise.then(function (bankAccount)
            {
                vm.bankAccount = bankAccount;
                vm.cmbBankAccountTypes = { BankAccountTypeID: vm.bankAccount.BankAccountTypeID };
                vm.cmbBanks = { BankID: vm.bankAccount.BankID };
                vm.cmbBankBranchs = { BankBranchID: vm.bankAccount.BankBranchID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid)
        {
            if (isValid)
            {
                bankAccountResource.update({ 'ID': vm.bankAccount.BankAccountID }, vm.bankAccount).$promise.then(function () {
                vm.bankAccounts = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
                }
            else
            {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function ()
        {
            //vm.bankAccount.$delete({ 'ID': vm.bankAccount.bankAccountID });
            bankAccountResource.delete({ 'ID':vm.bankAccount.BankAccountID }).$promise.then(function (data) {
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