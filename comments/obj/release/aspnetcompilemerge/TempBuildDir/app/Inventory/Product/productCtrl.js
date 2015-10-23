(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (productresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("productCtrl", ["unitOfMeasureResource", "productCategoryResource", "productResource", productCtrl]);
    function productCtrl(unitOfMeasureResource,productCategoryResource, productResource) {
        var vm = this;
        vm.products = [];
        vm.UnitOfMeasures = [];
        vm.ProductCategorys = [];

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
                vm.product = null;
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

        GetProductCategorys();
        function GetProductCategorys() {
            productCategoryResource.query(function (data) {
                vm.ProductCategorys = data;
              

            });

        }
        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query(function (data) {
                vm.UnitOfMeasures = data;

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            productResource.query(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save product
        vm.Save = function (isValid) {
            if (isValid) {
                productResource.save(vm.product,
                    function (data, responseHeaders) {
                        GetList();
                        vm.product = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            productResource.get({ 'ID': id }, function (product) {
                vm.product = product;
                vm.cmbProductCategory = { ProductCategoryID: vm.product.ProductCategoryID };
                vm.cmbUnitOfMeasure = { UnitOfMeasureID: vm.product.MOUID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productResource.update({ 'ID': vm.product.ProductID }, vm.product);
                vm.products = null;
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
            vm.product.$delete({ 'ID': vm.product.ProductID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());