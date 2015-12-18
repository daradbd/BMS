(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (billofMaterialCategoryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: billofMaterialCategoryResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("billofMaterialCategoryCtrl", ["billofMaterialCategoryResource", billofMaterialCategoryCtrl]);
    function billofMaterialCategoryCtrl(billofMaterialCategoryResource) {
        var vm = this;
        vm.billofMaterialCategorys = [];

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
                vm.billofMaterialCategory = null;
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


        GetList();

        //Get All Data List
        function GetList() {
            billofMaterialCategoryResource.query().$promise.then(function (data) {
                vm.billofMaterialCategorys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save billofMaterialCategory
        vm.Save = function (isValid) {
            if (isValid) {
                billofMaterialCategoryResource.save(vm.billofMaterialCategory).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.billofMaterialCategory = null;
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
            billofMaterialCategoryResource.get({ 'ID': id }).$promise.then(function (billofMaterialCategory) {
                vm.billofMaterialCategory = billofMaterialCategory;
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
                billofMaterialCategoryResource.update({ 'ID': vm.billofMaterialCategory.BillofMaterialCategoryID }, vm.billofMaterialCategory).$promise.then(function () {
                vm.billofMaterialCategorys = null;
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
           // vm.billofMaterialCategory.$delete({ 'ID': vm.billofMaterialCategory.BillofMaterialCategoryID });
            billofMaterialCategoryResource.delete({ 'ID': vm.billofMaterialCategory.BillofMaterialCategoryID }).$promise.then(function (data) {
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