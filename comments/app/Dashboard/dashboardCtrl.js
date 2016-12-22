(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (dashboardresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: dashboardResource
     *  @date: 9/4/2015
     */
//"dashboardResource",
    angular
        .module("companyManagement")
        .controller("dashboardCtrl", ["todoListResource", dashboardCtrl]);
    function dashboardCtrl(todoListResource) {
        var vm = this;
        vm.dashboards = [];
        vm.taskList = [];
        vm.GetTaskList = GetTaskList;
        vm.SaveTask = SaveTask;
        vm.UpdateTask = UpdateTask;
        vm.DeleteTask = DeleteTask;
        GetTaskList();



        //Save supplierType
         function SaveTask() {
             if (vm.Task) {
                todoListResource.save(vm.Task).$promise.then(
                    function (data, responseHeaders) {
                        GetTaskList();
                        vm.Task = null;
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

        //Data Update
         function UpdateTask(task) {
             if (task.TodoListID>0) {
                 todoListResource.update({ 'ID': task.TodoListID }, task).$promise.then(function () {
                     task = null;
                     GetTaskList();
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

        //Get All Data List
        function GetTaskList() {
            todoListResource.query().$promise.then(function (data) {
                vm.taskList = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Data Delete
        function DeleteTask(Task) {
            
            todoListResource.delete({ 'ID':Task.TodoListID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetTaskList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());