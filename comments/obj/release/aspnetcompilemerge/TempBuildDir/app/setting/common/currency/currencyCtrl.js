(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("currencyCtrl", ["currencyResource", "appAuth", currencyCtrl]);

    function currencyCtrl(currencyResource,appAuth) {
        var vm = this;
        vm.currencys = [];
        appAuth.checkPermission();
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
        vm.CancelButton = false;


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

        var DispayButton = function () {

        }
        //var companyCategor = new companyCategoryResource();

        //companyCategoryResource.query(function (data) {
        //    vm.companyCategorys = data;
        //    toastr.success("Data Load Successful","Form Load");

        //});

        GetList();

        function GetList() {
            currencyResource.query().$promise.then(function (data) {
                vm.currencys = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                currencyResource.save(vm.currency).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.currency = null;
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

        vm.Get = function (id) {
            currencyResource.get({ 'ID': id }).$promise.then(function (currency) {
                vm.currency = currency;
                //vm.FromView = true;
                //vm.EditView = false;
                //vm.ListView = false;
                //vm.DetailsView = true;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load failed!");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                currencyResource.update({ 'ID': vm.currency.currencyID }, vm.currency).$promise.then(function () {
                vm.currencys = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");

                }, function (error) {
                    // error handler
                    toastr.error("Data not Update Successfully!");
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
            //vm.currency.$delete({ 'ID': vm.currency.currencyID });
            currencyResource.delete({ 'ID': vm.currency.currencyID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data not Delete Successfully!");
            });;
        }

    }

}());