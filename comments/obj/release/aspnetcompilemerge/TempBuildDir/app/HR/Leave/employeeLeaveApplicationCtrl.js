(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (employeeLeaveApplicationresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeLeaveApplicationResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("employeeLeaveApplicationCtrl", ["collaboratorResource", "Util", "employeeLeaveGroupResource", "employeeLeaveTypeResource", "employeeLeaveApplicationResource", "appAuth", employeeLeaveApplicationCtrl]);
    function employeeLeaveApplicationCtrl(collaboratorResource, Util, employeeLeaveGroupResource, employeeLeaveTypeResource, employeeLeaveApplicationResource, appAuth) {
        var vm = this;
        vm.helpers = Util.helpers;
        vm.employeeLeaveApplications = [];
        vm.EmployeeLeaveTypes = [];
        vm.EmployeeLeaveGroups = [];
        appAuth.checkPermission();
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
                vm.employeeLeaveApplication = null;
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

        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }

        vm.eopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.eopened = !vm.eopened;

        }
         GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetEmployeeLeaveTypes();
        function GetEmployeeLeaveTypes() {
            employeeLeaveTypeResource.query().$promise.then(function (data) {
                vm.EmployeeLeaveTypes = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetEmployeeLeaveGroups();
        function GetEmployeeLeaveGroups() {
            employeeLeaveGroupResource.query().$promise.then(function (data) {
                vm.EmployeeLeaveGroups = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            employeeLeaveApplicationResource.query().$promise.then(function (data) {
                vm.employeeLeaveApplications = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save employeeLeaveApplication
        vm.Save = function (isValid) {
            if (isValid) {
                vm.employeeLeaveApplication.StratDate = Util.offsetTime(vm.employeeLeaveApplication.StratDate);
                vm.employeeLeaveApplication.EndDate = Util.offsetTime(vm.employeeLeaveApplication.EndDate);
                employeeLeaveApplicationResource.save(vm.employeeLeaveApplication).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.employeeLeaveApplication = null;
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
            employeeLeaveApplicationResource.get({ 'ID': id }).$promise.then(function (employeeLeaveApplication) {
                vm.employeeLeaveApplication = employeeLeaveApplication;
                vm.cmbEmployeeLeaveType = { EmployeeLeaveTypeID: vm.employeeLeaveApplication.EmployeeLeaveTypeID };
                vm.cmbEmployeeLeaveGroup = { EmployeeLeaveGroupID: vm.employeeLeaveApplication.EmployeeLeaveGroupID };
                vm.cmbEmployee = { CollaboratorID: vm.employeeLeaveApplication.EmployeeID };
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
                employeeLeaveApplicationResource.update({ 'ID': vm.employeeLeaveApplication.EmployeeLeaveApplicationID }, vm.employeeLeaveApplication).$promise.then(function () {
                vm.employeeLeaveApplications = null;
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
            //vm.employeeLeaveApplication.$delete({ 'ID': vm.employeeLeaveApplication.EmployeeLeaveApplicationID });
            employeeLeaveApplicationResource.delete({ 'ID':vm.employeeLeaveApplication.EmployeeLeaveApplicationID  }).$promise.then(function (data) {
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