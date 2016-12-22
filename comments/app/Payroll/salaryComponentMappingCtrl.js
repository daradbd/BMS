(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salaryComponentMappingresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salaryComponentMappingResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salaryComponentMappingCtrl", ["salaryComponentsResource", "salaryComponentMappingResource", salaryComponentMappingCtrl]);
    function salaryComponentMappingCtrl(salaryComponentsResource,salaryComponentMappingResource) {
        var vm = this;
        vm.salaryComponentMappings = [];
        vm.salaryComponents = [];

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
                vm.salaryComponentMapping = null;
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

        GetSalaryComponentList();

        //Get All Data List
        function GetSalaryComponentList() {
            salaryComponentsResource.query().$promise.then(function (data) {
                vm.salaryComponents = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetList();

        //Get All Data List
        function GetList() {
            salaryComponentMappingResource.query().$promise.then(function (data) {
                vm.salaryComponentMappings = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salaryComponentMapping
        vm.Save = function (isValid) {
           

            angular.forEach(vm.salaryComponentMappings, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var SalaryComponentInfo = {
                    SalaryComponentMappingID: value.SalaryComponentMappingID,
                    SalaryComponentConfigID: value.SalaryComponentConfigID,
                    SalaryComponentID: value.SalaryComponentID,
                   

                };


                salaryComponentMappingResource.save(SalaryComponentInfo).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })
            toastr.success("Save Successful");

        }

        //Get Single Record
        vm.Get = function (id) {
            salaryComponentMappingResource.get({ 'ID': id }).$promise.then(function (salaryComponentMapping) {
                vm.salaryComponentMapping = salaryComponentMapping;
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
                salaryComponentMappingResource.update({ 'ID': vm.salaryComponentMapping.SalaryComponentMappingID }, vm.salaryComponentMapping).$promise.then(function () {
                vm.salaryComponentMappings = null;
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
            
            salaryComponentMappingResource.delete({ 'ID': vm.salaryComponentMapping.SalaryComponentMappingID }).$promise.then(function (data) {
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