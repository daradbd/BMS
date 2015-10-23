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
        .controller("bankAccountCtrl", ["bankAccountOwnerTypeResource", "bankAccountTypeResource", "bankResource", "bankBranchResource", "bankAccountResource", bankAccountCtrl]);
    function bankAccountCtrl(bankAccountOwnerTypeResource, bankAccountTypeResource,bankResource, bankBranchResource, bankAccountResource)
    {
        var vm = this;
        vm.bankAccounts = [];
        vm.banks = [];
        vm.bankBranchs = [];
        vm.bankAccountTypes = [];
        vm.bankAccountOwnerTypes = [];

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



        vm.ViewMode = function (activeMode)
        {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.bankAccount = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
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
            }
        }

        var DispayButton = function ()
        {

        }
        GetBankList();
        function GetBankList()
        {
            bankResource.query(function (data)
            {
                vm.banks = data;
                toastr.success("Load banks", "Country banks");
            });
        }
        GetbankBranchList();
        function GetbankBranchList()
        {
            bankBranchResource.query(function (data)
            {
                vm.bankBranchs = data;
                toastr.success("Load BankBranch", "Country Load");
            });
        }

        GetbankAccountTypeList();
        function GetbankAccountTypeList()
        {
            bankAccountTypeResource.query(function (data)
            {
                vm.bankAccountTypes = data;
                toastr.success("Load bankAccountType", "bankAccountType Load");
            });
        }
        GetBankAccountOwnerTypeList();
        function GetBankAccountOwnerTypeList()
        {
            bankAccountOwnerTypeResource.query(function (data)
            {
                vm.bankAccountOwnerTypes = data;
                toastr
.success("Load AccountOwner", "AccountOwner Load");
            });
        }

        GetList();

        //Get All Data List
        function GetList()
        {
            bankAccountResource.query(function (data)
            {
                vm.bankAccounts = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save bankAccount
        vm.Save = function (isValid)
        {
            if (isValid)
            {
                bankAccountResource.save(vm.bankAccount,
                    function (data, responseHeaders)
                    {
                        GetList();
                        vm.bankAccount = null;
                        toastr.success("Save Successful");
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
            bankAccountResource.get({ 'ID': id }, function (bankAccount)
            {
                vm.bankAccount = bankAccount;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid)
        {
            if (isValid)
            {
                bankAccountResource.update({ 'ID': vm.bankAccount.bankAccountID }, vm.bankAccount);
                vm.bankAccounts = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else
            {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function ()
        {
            vm.bankAccount.$delete({ 'ID': vm.bankAccount.bankAccountID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());