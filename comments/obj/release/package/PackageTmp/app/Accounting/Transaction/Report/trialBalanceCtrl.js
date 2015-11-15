(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (trialBalanceresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: trialBalanceResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("trialBalanceCtrl", ["trialBalanceResource", trialBalanceCtrl]);
    function trialBalanceCtrl(trialBalanceResource) {
        var vm = this;
        vm.trialBalances = [];

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
                vm.trialBalance = null;
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
            trialBalanceResource.query(function (data) {
                vm.trialBalances = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save trialBalance
        vm.Save = function (isValid) {
            if (isValid) {
                trialBalanceResource.save(vm.trialBalance,
                    function (data, responseHeaders) {
                        GetList();
                        vm.trialBalance = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            trialBalanceResource.get({ 'ID': id }, function (trialBalance) {
                vm.trialBalance = trialBalance;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                trialBalanceResource.update({ 'ID': vm.trialBalance.trialBalanceID }, vm.trialBalance);
                vm.trialBalances = null;
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
            vm.trialBalance.$delete({ 'ID': vm.trialBalance.trialBalanceID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());