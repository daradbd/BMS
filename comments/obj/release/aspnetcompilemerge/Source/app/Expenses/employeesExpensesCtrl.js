(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (employeesExpensesresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeesExpensesResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("employeesExpensesCtrl", ["employeeExpensesDescriptionResource", "expensesTypeResource", "projectSetupResource", "collaboratorResource", "Util", "employeesExpensesResource", "param", "appAuth", employeesExpensesCtrl]);
    function employeesExpensesCtrl(employeeExpensesDescriptionResource, expensesTypeResource, projectSetupResource, collaboratorResource, Util, employeesExpensesResource, param, appAuth) {
        var vm = this;
        vm.FormTypeID = param.FormTypeID;
        vm.FormName = param.FormName;
        vm.employeesExpensess = [];
        vm.employeesExpensesDescription = { employeesExpensesDesc:[]};
        //appAuth.checkPermission();
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

        vm.addItem = function () {
            vm.employeesExpensesDescription.employeesExpensesDesc.unshift({ ExpensesTypeID: 0, EmployeesExpensesDescriptionName: "", ExpenseDate: "", sopened: false, ProjectID: 0, Quantity: 1, ExpenseRate: 0,ApproveAmount:0 });
        }
        vm.PushItem = function () {
            vm.employeesExpensesDescription.employeesExpensesDesc.push({ ExpensesTypeID: 0, EmployeesExpensesDescriptionName: "", ExpenseDate: "", sopened: false, ProjectID: 0, Quantity: 1, ExpenseRate: 0,ApproveAmount:0 });
        }
        vm.removeItem = function (item) {
            vm.employeesExpensesDescription.employeesExpensesDesc.splice(vm.employeesExpensesDescription.employeesExpensesDesc.indexOf(item), 1);
        }
        vm.updateItem = function (item) {
           // item.Description = item.cmbProductID.ProductName;
            //item.ProductID = item.cmbProductID.ProductID;
            //item.ProductID = item.cmbProductID.ProductID;
            //item.UnitPrice = item.cmbProductID.SalePrice;
        }

        vm.ssopen = function (item, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            item.sopened = !item.sopened;

        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.employeesExpenses = null;
                vm.employeesExpensesDescription = { employeesExpensesDesc: [{ ExpensesTypeID: 0, EmployeesExpensesDescriptionName: "", ExpenseDate: "", sopened: false,ProjectID:0, Quantity: 1 ,ExpenseRate:0,ApproveAmount:0}] };
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

        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }


        vm.totalApply = function () {
            var totalApply = 0.00;
            angular.forEach(vm.employeesExpensesDescription.employeesExpensesDesc, function (item, key) {

                totalApply += (item.ExpenseRate * item.Quantity);

            });
            return totalApply;

        }

        vm.totalApproveAmount = function () {
            var totalApproveAmount = 0.00;
                    angular.forEach(vm.employeesExpensesDescription.employeesExpensesDesc, function (item, key) {

                        totalApproveAmount += (item.ApproveAmount);

                    });
                    return totalApproveAmount;

                }

        vm.eopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.eopened = !vm.eopened;

        }
        var DispayButton = function () {

        }
        GetExpensesTypetList();

        //Get All Data List
        function GetExpensesTypetList() {
            expensesTypeResource.query().$promise.then(function (data) {
                vm.expensesTypes = data;

            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;

            });
        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;

            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            employeesExpensesResource.query().$promise.then(function (data) {
                vm.employeesExpensess = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save employeesExpenses
        vm.Save = function (isValid) {
            if (isValid) {
                employeesExpensesResource.save(vm.employeesExpenses).$promise.then(
                    function (data, responseHeaders) {
                        vm.employeesExpenses = data;
                        vm.SaveExpensesDesc();
                        GetList();
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


        //Save Quotation Description
        vm.SaveExpensesDesc = function () {

            angular.forEach(vm.employeesExpensesDescription.employeesExpensesDesc, function (value, key) {
                // var TDate = new Date(vm.voucherList.TranDate);

                var employeesExpensesDesc = {
                    EmployeesExpensesDescriptionID: value.EmployeesExpensesDescriptionID,
                    EmployeesExpensesDescriptionName:value.EmployeesExpensesDescriptionName,
                    EmployeesExpensesID:vm.employeesExpenses.EmployeesExpensesID,
                    EmployeeID: vm.employeesExpenses.EmployeeID,
                    ExpensesTypeID: value.ExpensesTypeID,
                    ProjectID: value.ProjectID,
                    ExpenseDate: value.ExpenseDate,
                    Quantity: value.Quantity,
                    ExpenseRate: value.ExpenseRate,
                    ApproveAmount: value.ApproveAmount,
                    
                };
                

                employeeExpensesDescriptionResource.save(employeesExpensesDesc).$promise.then(
                function (data, responseHeaders) {

                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });
            })
            vm.employeesExpenses = null;
            vm.employeesExpensesDescription.employeesExpensesDesc = null;

        }


        //Get Single Record
        vm.Get = function (id) {
            employeesExpensesResource.get({ 'ID': id }).$promise.then(function (employeesExpenses) {
                vm.employeesExpenses = employeesExpenses;
                vm.cmbEmployee = vm.employeesExpenses.Employee;
                vm.GetExpensesDesc(vm.employeesExpenses.EmployeesExpensesID);
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        vm.GetExpensesDesc = function (EmployeesExpensesID) {
            employeeExpensesDescriptionResource.query({ '$filter': 'EmployeesExpensesID eq ' + EmployeesExpensesID }).$promise.then(function (employeeExpensesDescription) {
                vm.employeesExpensesDescription.employeesExpensesDesc = employeeExpensesDescription;

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
                employeesExpensesResource.update({ 'ID': vm.employeesExpenses.EmployeesExpensesID }, vm.employeesExpenses).$promise.then(function () {
                    vm.SaveExpensesDesc().then(function () {
                        vm.employeesExpensess = null;
                        vm.ViewMode(3);
                        GetList();
                        toastr.success("Data Update Successful", "Form Update");
                    });

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
            //vm.employeesExpenses.$delete({ 'ID': vm.employeesExpenses.EmployeesExpensesID });
            employeesExpensesResource.delete({ 'ID':vm.employeesExpenses.EmployeesExpensesID  }).$promise.then(function (data) {
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