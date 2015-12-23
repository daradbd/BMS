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
        .controller("purchaseOrderCategoryCtrl", ["accCOAResource", "purchaseOrderCategoryResource", purchaseOrderCategoryCtrl]);
    function purchaseOrderCategoryCtrl(accCOAResource,purchaseOrderCategoryResource) {
        var vm = this;
        vm.purchaseOrderCategorys = [];

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
                vm.purchaseOrderCategory = null;
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

        getCOAList();
        function getCOAList () {

            accCOAResource.query({ '$filter': 'HasChild eq false' }, function (data) {
                vm.AccCOAs = data;
                //toastr.success("Data function Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            purchaseOrderCategoryResource.query(function (data) {
                vm.purchaseOrderCategorys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save purchaseOrderCategory
        vm.Save = function (isValid) {
            if (isValid) {
                vm.purchaseOrderCategory.COAID = vm.cmbCOAID.COAID;
                purchaseOrderCategoryResource.save(vm.purchaseOrderCategory,
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseOrderCategory = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            purchaseOrderCategoryResource.get({ 'ID': id }, function (purchaseOrderCategory) {
                vm.purchaseOrderCategory = purchaseOrderCategory;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.purchaseOrderCategory.COAID = vm.cmbCOAID.COAID;
                purchaseOrderCategoryResource.update({ 'ID': vm.purchaseOrderCategory.PurchaseOrderCategoryID }, vm.purchaseOrderCategory);
                vm.purchaseOrderCategorys = null;
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
            vm.purchaseOrderCategory.$delete({ 'ID': vm.purchaseOrderCategory.PurchaseOrderCategoryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());
