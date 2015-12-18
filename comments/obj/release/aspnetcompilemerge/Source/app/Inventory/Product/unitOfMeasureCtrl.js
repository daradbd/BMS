(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (unitOfMeasureresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: unitOfMeasureResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("unitOfMeasureCtrl", ["unitOfMeasureResource", unitOfMeasureCtrl]);
    function unitOfMeasureCtrl(unitOfMeasureResource) {
        var vm = this;
        vm.unitOfMeasures = [];

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
                vm.unitOfMeasure = null;
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
            unitOfMeasureResource.query().$promise.then(function (data) {
                vm.unitOfMeasures = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save unitOfMeasure
        vm.Save = function (isValid) {
            if (isValid) {
                unitOfMeasureResource.save(vm.unitOfMeasure).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.unitOfMeasure = null;
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
            unitOfMeasureResource.get({ 'ID': id }).$promise.then(function (unitOfMeasure) {
                vm.unitOfMeasure = unitOfMeasure;
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
                unitOfMeasureResource.update({ 'ID': vm.unitOfMeasure.UnitOfMeasureID }, vm.unitOfMeasure).$promise.then(function () {
                vm.unitOfMeasures = null;
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
           // vm.unitOfMeasure.$delete({ 'ID': vm.unitOfMeasure.UnitOfMeasureID });
            unitOfMeasureResource.delete({ 'ID': vm.unitOfMeasure.UnitOfMeasureID }).$promise.then(function (data) {
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