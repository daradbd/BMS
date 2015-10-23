(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (employeeLeaveTyperesource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeLeaveTypeResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("employeeLeaveTypeCtrl", ["employeeLeaveTypeResource", employeeLeaveTypeCtrl]);
    function employeeLeaveTypeCtrl(employeeLeaveTypeResource) {
        var vm = this;
        vm.employeeLeaveTypes = [];

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
                vm.employeeLeaveType = null;
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
            employeeLeaveTypeResource.query(function (data) {
                vm.employeeLeaveTypes = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save employeeLeaveType
        vm.Save = function (isValid) {
            if (isValid) {
                employeeLeaveTypeResource.save(vm.employeeLeaveType,
                    function (data, responseHeaders) {
                        GetList();
                        vm.employeeLeaveType = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            employeeLeaveTypeResource.get({ 'ID': id }, function (employeeLeaveType) {
                vm.employeeLeaveType = employeeLeaveType;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                employeeLeaveTypeResource.update({ 'ID': vm.employeeLeaveType.EmployeeLeaveTypeID }, vm.employeeLeaveType);
                vm.employeeLeaveTypes = null;
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
            vm.employeeLeaveType.$delete({ 'ID': vm.employeeLeaveType.EmployeeLeaveTypeID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());