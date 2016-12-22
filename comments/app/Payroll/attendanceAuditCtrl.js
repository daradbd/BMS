(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (attendanceAuditresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: attendanceAuditResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("attendanceAuditCtrl", ["attendanceAuditResource", "$filter", attendanceAuditCtrl]);
    function attendanceAuditCtrl(attendanceAuditResource, $filter) {
        var vm = this;
        vm.attendanceAudits = [];
       // vm.MonthYear = new Date();

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
                vm.attendanceAudit = null;
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

        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }
        
        var DispayButton = function () {

        }

        

        vm.UpdateValue = function (Value, KeyName) {
            angular.forEach(vm.attendanceAudits, function (item, key) {

                item[KeyName] = Value;


            });

        }

        vm.GetAuditList = function () {
            var my= $filter('date')(vm.attendanceAudit.MonthYear, "MMMM-yyyy");
            attendanceAuditResource.query({ 'MonthYear': my }).$promise.then(function (data) {
                vm.attendanceAudits = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            var my = new Date();
            attendanceAuditResource.query({ 'MonthYear': my }).$promise.then(function (data) {
                vm.attendanceAudits = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save attendanceAudit
        vm.Save = function (isValid) {
            //if (isValid) {
            //    attendanceAuditResource.save(vm.attendanceAudit).$promise.then(
            //        function (data, responseHeaders) {
            //            GetList();
            //            vm.attendanceAudit = null;
            //            toastr.success("Save Successful");
            //        }, function (error) {
            //            // error handler
            //            toastr.error("Data Load Failed!");
            //        });
            //}
            //else {

            //    toastr.error("Form is not valid");
            //}
            angular.forEach(vm.attendanceAudits, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var attendanceAuditInfo = {
                    AttendanceAuditID: value.AttendanceAuditID,
                    EmployeeID: value.EmployeeID,
                    MonthYear: $filter('date')(vm.attendanceAudit.MonthYear, "MMMM-yyyy"),
                    DaysWorked: value.DaysWorked,
                    EarnedLeave: value.EarnedLeave,
                    CasualLeave: value.CasualLeave,
                    LateAttendance: value.LateAttendance,
                    OverTime: value.OverTime,

                };


                attendanceAuditResource.save(attendanceAuditInfo).$promise.then(
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
            attendanceAuditResource.get({ 'ID': id }).$promise.then(function (attendanceAudit) {
                vm.attendanceAudit = attendanceAudit;
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
                attendanceAuditResource.update({ 'ID': vm.attendanceAudit.AttendanceAuditID }, vm.attendanceAudit).$promise.then(function () {
                vm.attendanceAudits = null;
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
           
            attendanceAuditResource.delete({ 'ID':  vm.attendanceAudit.AttendanceAuditID }).$promise.then(function (data) {
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