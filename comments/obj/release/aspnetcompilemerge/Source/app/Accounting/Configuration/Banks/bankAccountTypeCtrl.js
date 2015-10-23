(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (bankAccountTyperesource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankAccountTypeResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("bankAccountTypeCtrl", ["bankAccountTypeResource", bankAccountTypeCtrl]);
    function bankAccountTypeCtrl(bankAccountTypeResource) {
        var vm = this;
        vm.bankAccountTypes = [];

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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.bankAccountType = null;
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

        var DispayButton = function () {

        }


        GetList();

        //Get All Data List
        function GetList() {
            bankAccountTypeResource.query(function (data) {
                vm.bankAccountTypes = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save bankAccountType
        vm.Save = function (isValid) {
            if (isValid) {
                bankAccountTypeResource.save(vm.bankAccountType,
                    function (data, responseHeaders) {
                        GetList();
                        vm.bankAccountType = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            bankAccountTypeResource.get({ 'ID': id }, function (bankAccountType) {
                vm.bankAccountType = bankAccountType;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                bankAccountTypeResource.update({ 'ID': vm.bankAccountType.bankAccountTypeID }, vm.bankAccountType);
                vm.bankAccountTypes = null;
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
            vm.bankAccountType.$delete({ 'ID': vm.bankAccountType.bankAccountTypeID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());