(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (paymentMethodresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: paymentMethodResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("paymentMethodCtrl", ["accCOAConfigResource", "paymentMethodResource", paymentMethodCtrl]);
    function paymentMethodCtrl(accCOAConfigResource,paymentMethodResource) {
        var vm = this;
        vm.paymentMethods = [];
        vm.accCOAConfigs = [];

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
                vm.paymentMethod = null;
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

        GetaccCOAConfigList();

        //Get All Data List
        function GetaccCOAConfigList() {
            accCOAConfigResource.query().$promise.then(function (data) {
                vm.accCOAConfigs = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetList();

        //Get All Data List
        function GetList() {
            paymentMethodResource.query().$promise.then(function (data) {
                vm.paymentMethods = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save paymentMethod
        vm.Save = function (isValid) {
            if (isValid) {
                paymentMethodResource.save(vm.paymentMethod).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.paymentMethod = null;
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
            paymentMethodResource.get({ 'ID': id }).$promise.then(function (paymentMethod) {
                vm.paymentMethod = paymentMethod;
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
                paymentMethodResource.update({ 'ID': vm.paymentMethod.PaymentMethodID }, vm.paymentMethod).$promise.then(function () {
                vm.paymentMethods = null;
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
           // vm.paymentMethod.$delete({ 'ID': vm.paymentMethod.PaymentMethodID });
            paymentMethodResource.delete({ 'ID': vm.paymentMethod.PaymentMethodID }).$promise.then(function (data) {
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