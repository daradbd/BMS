(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salaryComponentsresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salaryComponentsResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salaryComponentsCtrl", ["calculationTypesResource", "payTypesResource", "salaryComponentsResource", salaryComponentsCtrl]);
    function salaryComponentsCtrl(calculationTypesResource,payTypesResource, salaryComponentsResource) {
        var vm = this;
        vm.salaryComponentss = [];
        vm.CalculationTypes = [];
        vm.PayTypes = [];

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
                vm.salaryComponents = null;
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

        GetCalculationTypeList();

        //Get All Data List
        function GetCalculationTypeList() {
            calculationTypesResource.query().$promise.then(function (data) {
                vm.CalculationTypes = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetPayTypeList();

        //Get All Data List
        function GetPayTypeList() {
            payTypesResource.query().$promise.then(function (data) {
                vm.PayTypes = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            salaryComponentsResource.query().$promise.then(function (data) {
                vm.salaryComponentss = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save salaryComponents
        vm.Save = function (isValid) {
            if (isValid) {
                salaryComponentsResource.save(vm.salaryComponents).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.salaryComponents = null;
                        vm.cmbCalculationType = null;
                        vm.cmbPayType = null;
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
            salaryComponentsResource.get({ 'ID': id }).$promise.then(function (salaryComponents) {
                vm.salaryComponents = salaryComponents;
                vm.cmbPayType = vm.salaryComponents.PayType;
                vm.cmbCalculationType = vm.salaryComponents.CalculationType;
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
                salaryComponentsResource.update({ 'ID': vm.salaryComponents.SalaryComponentID }, vm.salaryComponents).$promise.then(function () {
                vm.salaryComponentss = null;
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
            salaryComponentsResource.delete({ 'ID': vm.salaryComponents.SalaryComponentID }).$promise.then(function (data) {
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