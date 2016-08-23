(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseOrderCategoryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrderCategoryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseOrderCategoryCtrl", ["accCOAResource", "purchaseOrderCategoryResource", "appAuth", purchaseOrderCategoryCtrl]);
    function purchaseOrderCategoryCtrl(accCOAResource, purchaseOrderCategoryResource, appAuth) {
        var vm = this;
        vm.purchaseOrderCategorys = [];
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
                vm.purchaseOrderCategory = null;
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

        getCOAList();
        function getCOAList () {

            accCOAResource.query({ '$filter': 'HasChild eq false' }).$promise.then(function (data) {
                vm.AccCOAs = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseOrderCategoryResource.query().$promise.then(function (data) {
                vm.purchaseOrderCategorys = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseOrderCategory
        vm.Save = function (isValid) {
            if (isValid) {
                vm.purchaseOrderCategory.COAID = vm.cmbCOAID.COAID;
                purchaseOrderCategoryResource.save(vm.purchaseOrderCategory).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseOrderCategory = null;
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
            purchaseOrderCategoryResource.get({ 'ID': id }).$promise.then(function (purchaseOrderCategory) {
                vm.purchaseOrderCategory = purchaseOrderCategory;
                vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.purchaseOrderCategory.COAID = vm.cmbCOAID.COAID;
                purchaseOrderCategoryResource.update({ 'ID': vm.purchaseOrderCategory.PurchaseOrderCategoryID }, vm.purchaseOrderCategory).$promise.then(function () {
                vm.purchaseOrderCategorys = null;
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
            //vm.purchaseOrderCategory.$delete({ 'ID':  });
            purchaseOrderCategoryResource.delete({ 'ID': vm.purchaseOrderCategory.PurchaseOrderCategoryID }).$promise.then(function (data) {
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
