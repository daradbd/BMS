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
        .controller("productModalCtrl", ["productBrandResource", "productSpecificationDescriptionResource", "productSpecificationResource", "unitOfMeasureResource", "productCategoryResource", "productResource", "$uibModal", "$uibModalInstance", "appAuth", productModalCtrl]);
    function productModalCtrl(productBrandResource, productSpecificationDescriptionResource, productSpecificationResource, unitOfMeasureResource, productCategoryResource, productResource, $uibModal, $uibModalInstance, appAuth) {
        var vm = this;
        vm.products = [];
        vm.UnitOfMeasures = [];
        vm.ProductCategorys = [];
        vm.productSpecifications = [];
        vm.productSpecificationDescriptions = [];
        vm.isModal = true;

        vm.ProductSpecificationDescription = { producttSpecificationnDesc: [] };

        vm.addItem = function () {
            vm.ProductSpecificationDescription.producttSpecificationnDesc.unshift({ProductSpecificationDescriptionID:0, ProductSpecificationID: 0, SpecificationValue: "" });
        }
        vm.PushItem = function () {
            vm.ProductSpecificationDescription.producttSpecificationnDesc.push({ ProductSpecificationDescriptionID: 0, ProductSpecificationID: 0, SpecificationValue: "" });
        }
        vm.removeItem = function (item) {
            vm.ProductSpecificationDescription.producttSpecificationnDesc.splice(vm.ProductSpecificationDescription.producttSpecificationnDesc.indexOf(item), 1);
        }

        appAuth.checkPermission();

        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false;
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
                vm.product = null;
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
                //vm.product.Image = "#";
                vm.product = null;
                vm.ProductSpecificationDescription.producttSpecificationnDesc = null;
                vm.product = null;
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
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
                vm.DetailsView = true;
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
                vm.DetailsView = false;
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
        vm.openUpload = function () {

            var FileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            FileUpload.result.then(function (d) {
                vm.product.Image = d.File.UploadFilePath;
                

            });
        }
        GetProductBrandList();

        //Get All Data List
        function GetProductBrandList() {
            productBrandResource.query().$promise.then(function (data) {
                vm.productBrands = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetSpecificationList();

        //Get All Data List
        function GetSpecificationList() {
            productSpecificationResource.query().$promise.then(function (data) {
                vm.productSpecifications = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetProductCategorys();
        function GetProductCategorys() {
            productCategoryResource.query().$promise.then(function (data) {
                vm.ProductCategorys = data;
              

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }
        GetUnitOfMeasures();
        function GetUnitOfMeasures() {
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.UnitOfMeasures = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            productResource.query().$promise.then(function (data) {
                vm.products = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        //Save product
        vm.SaveClose = function (isValid) {
            if (isValid) {
                productResource.save(vm.product).$promise.then(
                    function (data, responseHeaders) {
                       // GetList();
                        vm.product = data;
                        vm.SaveSpecification();
                        $uibModalInstance.close(vm.product);
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


        //Save product
        vm.Save = function (isValid) {
            if (isValid) {
                productResource.save(vm.product).$promise.then(
                    function (data, responseHeaders) {
                       // GetList();
                        vm.product = data;
                        vm.SaveSpecification();
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

        //Save Specification Description
        vm.SaveSpecification = function () {

            angular.forEach(vm.ProductSpecificationDescription.producttSpecificationnDesc, function (value, key) {
               
                var productSpecificationInfo = {
                    ProductSpecificationDescriptionID: value.ProductSpecificationDescriptionID,
                    ProductSpecificationID: value.ProductSpecificationID,
                    ProductID: vm.product.ProductID,
                    SpecificationValue: value.SpecificationValue,
                };
                

                productSpecificationDescriptionResource.save(productSpecificationInfo).$promise.then(
                function (data, responseHeaders) {

                });
            })


        }
        //Get Single Record
        vm.Get = function (id) {
            productResource.get({ 'ID': id }).$promise.then(function (product) {
                vm.product = product;
                vm.cmbProductCategory = { ProductCategoryID: vm.product.ProductCategoryID };
                vm.cmbUnitOfMeasure = { UnitOfMeasureID: vm.product.UOMID };
                vm.cmbProductBrand = { ProductBrandID: vm.product.ProductBrandID };
                GetproductSpecificationDescription(vm.product.ProductID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.SelectClose = function () {
            $uibModalInstance.close(vm.product);
        }

        vm.mClose = function () {
            $uibModalInstance.dismiss();
        }

        //Get All Data List
        function GetproductSpecificationDescription(ProductID) {
            productSpecificationDescriptionResource.query({ '$filter': 'ProductID eq ' + ProductID }).$promise.then(function (data) {
                vm.ProductSpecificationDescription.producttSpecificationnDesc = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                productResource.update({ 'ID': vm.product.ProductID }, vm.product).$promise.then(function () {
                vm.SaveSpecification();
                vm.products = null;
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
            //vm.product.$delete({ 'ID': vm.product.ProductID });
            productResource.delete({ 'ID': vm.product.ProductID }).$promise.then(function (data) {
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