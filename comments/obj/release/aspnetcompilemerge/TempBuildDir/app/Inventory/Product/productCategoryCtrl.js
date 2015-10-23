(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productCategoryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productCategoryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productCategoryCtrl", ["productCategoryResource", productCategoryCtrl]);
    function productCategoryCtrl(productCategoryResource) {
        var vm = this;
        vm.productCategorys = [];
        vm.productCategory = [];
        vm.cmbproductCategory = [];

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
                vm.productCategory = null;
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
            productCategoryResource.query(function (data) {
                vm.productCategorys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save productCategory
        vm.Save = function (isValid) {
            if (isValid) {
                productCategoryResource.save(vm.productCategory,
                    function (data, responseHeaders) {
                        GetList();
                        vm.productCategory = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            productCategoryResource.get({ 'ID': id }, function (productCategory) {
                vm.productCategory = productCategory;
                vm.cmbproductCategory = { ProductCategoryID: vm.productCategory.ParentCategoryID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }



        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productCategoryResource.update({ 'ID': vm.productCategory.ProductCategoryID }, vm.productCategory);
                vm.productCategorys = null;
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
            vm.productCategory.$delete({ 'ID': vm.productCategory.ProductCategoryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());