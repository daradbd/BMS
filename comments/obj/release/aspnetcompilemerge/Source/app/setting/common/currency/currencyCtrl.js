(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("currencyCtrl", ["currencyResource", currencyCtrl]);

    function currencyCtrl(currencyResource) {
        var vm = this;
        vm.currencys = [];

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
                vm.currency = null;
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
        //var companyCategor = new companyCategoryResource();

        //companyCategoryResource.query(function (data) {
        //    vm.companyCategorys = data;
        //    toastr.success("Data Load Successful","Form Load");

        //});

        GetList();

        function GetList() {
            currencyResource.query(function (data) {
                vm.currencys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                currencyResource.save(vm.currency,
                    function (data, responseHeaders) {
                        GetList();
                        vm.currency = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.Get = function (id) {
            currencyResource.get({ 'ID': id }, function (currency) {
                vm.currency = currency;
                //vm.FromView = true;
                //vm.EditView = false;
                //vm.ListView = false;
                //vm.DetailsView = true;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                currencyResource.update({ 'ID': vm.currency.currencyID }, vm.currency);
                vm.currencys = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
            vm.currency.$delete({ 'ID': vm.currency.currencyID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());