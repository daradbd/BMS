(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (companyBranchTyperesource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyBranchTypeResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("companyBranchTypeCtrl", ["companyBranchTypeResource", companyBranchTypeCtrl]);
    function companyBranchTypeCtrl(companyBranchTypeResource) {
        var vm = this;
        vm.companyBranchTypes = [];

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
                vm.companyBranchType = null;
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


        GetList();

        //Get All Data List
        function GetList() {
            companyBranchTypeResource.query().$promise.then(function (data) {
                vm.companyBranchTypes = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Save Failed!");
            });
        }

        //Save companyBranchType
        vm.Save = function (isValid) {
            if (isValid) {
                companyBranchTypeResource.save(vm.companyBranchType).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.companyBranchType = null;
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
            companyBranchTypeResource.get({ 'ID': id }).$promise.then(function (companyBranchType) {
                vm.companyBranchType = companyBranchType;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Save Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                companyBranchTypeResource.update({ 'ID': vm.companyBranchType.companyBranchTypeID }, vm.companyBranchType).$promise.then(function () {
                vm.companyBranchTypes = null;
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
            //vm.companyBranchType.$delete({ 'ID': vm.companyBranchType.companyBranchTypeID });
            companyBranchTypeResource.delete({ 'ID': vm.companyBranchType.companyBranchTypeID }).$promise.then(function (data) {
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