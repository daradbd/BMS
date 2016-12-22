(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (formUserPermissionresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: formUserPermissionResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("formUserPermissionCtrl", ["collaboratorResource", "formUserPermissionResource", "appAuth", formUserPermissionCtrl]);
    function formUserPermissionCtrl(collaboratorResource, formUserPermissionResource, appAuth) {
        var vm = this;
        vm.formUserPermissions = [];
        vm.formUserPermissionList = [];
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
            //GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.formUserPermission = null;
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

        vm.UpdatePermission = function (Value, KeyName) {
            angular.forEach(vm.formUserPermissionList, function (item, key) {

                item[KeyName] = Value;


            });

        }

        vm.SelectAll = function (formUserPermission) {
            formUserPermission.View = formUserPermission.All;
            formUserPermission.Insert = formUserPermission.All;
            formUserPermission.Update = formUserPermission.All;
            formUserPermission.Delete = formUserPermission.All;

        }
        GetEmployeeList();

        //Get All Data List
        function GetEmployeeList() {

            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

       // GetList();

        //Get All Data List
        function GetList() {
            formUserPermissionResource.query().$promise.then(function (data) {
                vm.formUserPermissions = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save formUserPermission
        vm.Save = function (isValid) {
            if (isValid) {
                formUserPermissionResource.save(vm.formUserPermission).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.formUserPermission = null;
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
            vm.formUserPermissionList = null;
            vm.View = false;
            vm.Insert = false;
            vm.Update = false;
            vm.Delete = false;

            formUserPermissionResource.query({ 'ID': id.UserID }).$promise.then(function (formUserPermission) {
                vm.formUserPermissionList = formUserPermission;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        //vm.Get = function (Employee) {
        //    vm.formUserPermission = null;
        //    var param = { 'ID': Employee.UserID };
        //    formUserPermissionResource.query().$promise.then(param, function (data) {
        //        vm.formUserPermission = data;
        //       // vm.cmbEmployee = Employee;
        //        vm.ViewMode(3);
        //        toastr.success("Data Load Successful", "Form Load");
        //     //   console.log(JSON.stringify(vm.ledgerSheets));
        //    }, function (error) {
        //        // error handler
        //        toastr.error("Data Load Failed!");
        //    });
        //}

        vm.SaveFrmPermission = function () {


            angular.forEach(vm.formUserPermissionList, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var frmUserPermission = {
                    FormUserPermissionID: value.FormUserPermissionID,
                    UserID: value.UserID,
                    FormID: value.FormID,
                    View: value.View,
                    Insert: value.Insert,
                    Update: value.Update,
                    Delete: value.Delete,
                   
                };
                //alert(angular.toJson(VoucherInfo));


                formUserPermissionResource.save(frmUserPermission).$promise.then(
                function (data, responseHeaders) {

                });
            })

            toastr.success("Save Successful");


        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                formUserPermissionResource.update({ 'ID': vm.formUserPermission.FormUserPermissionID }, vm.formUserPermission).$promise.then(function () {
                vm.formUserPermissions = null;
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
            formUserPermissionResource.delete({ 'ID': vm.formUserPermission.FormUserPermissionID }).$promise.then(function (data) {
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