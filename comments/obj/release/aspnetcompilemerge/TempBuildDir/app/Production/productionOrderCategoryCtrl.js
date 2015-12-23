(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productionOrderCategoryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionOrderCategoryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productionOrderCategoryCtrl", ["productionOrderCategoryResource", productionOrderCategoryCtrl]);
    function productionOrderCategoryCtrl(productionOrderCategoryResource) {
        var vm = this;
        vm.productionOrderCategorys = [];

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
                vm.productionOrderCategory = null;
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
            productionOrderCategoryResource.query(function (data) {
                vm.productionOrderCategorys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save productionOrderCategory
        vm.Save = function (isValid) {
            if (isValid) {
                productionOrderCategoryResource.save(vm.productionOrderCategory,
                    function (data, responseHeaders) {
                        GetList();
                        vm.productionOrderCategory = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            productionOrderCategoryResource.get({ 'ID': id }, function (productionOrderCategory) {
                vm.productionOrderCategory = productionOrderCategory;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productionOrderCategoryResource.update({ 'ID': vm.productionOrderCategory.ProductionOrderCategoryID }, vm.productionOrderCategory);
                vm.productionOrderCategorys = null;
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
            vm.productionOrderCategory.$delete({ 'ID': vm.productionOrderCategory.ProductionOrderCategoryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());