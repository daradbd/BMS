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
        .controller("employeesExpensesCtrl", ["expensesTypeResource", "projectSetupResource", "collaboratorResource", "Util", "employeesExpensesResource", employeesExpensesCtrl]);
    function employeesExpensesCtrl(expensesTypeResource,projectSetupResource, collaboratorResource, Util, employeesExpensesResource) {
        var vm = this;
        vm.employeesExpensess = [];

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
        var DispayButton = function () {

        }
        GetExpensesTypetList();

        //Get All Data List
        function GetExpensesTypetList() {
            expensesTypeResource.query(function (data) {
                vm.expensesTypes = data;

            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query(function (data) {
                vm.Projects = data;

            });
        }

        GetEmployeeList();
        //Get All Data List
        function GetEmployeeList() {
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }, function (data) {
                vm.Employees = data;

            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            employeesExpensesResource.query(function (data) {
                vm.employeesExpensess = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save employeesExpenses
        vm.Save = function (isValid) {
            if (isValid) {
                employeesExpensesResource.save(vm.employeesExpenses,
                    function (data, responseHeaders) {
                        GetList();
                        vm.employeesExpenses = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            employeesExpensesResource.get({ 'ID': id }, function (employeesExpenses) {
                vm.employeesExpenses = employeesExpenses;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                employeesExpensesResource.update({ 'ID': vm.employeesExpenses.EmployeesExpensesID }, vm.employeesExpenses);
                vm.employeesExpensess = null;
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
            vm.employeesExpenses.$delete({ 'ID': vm.employeesExpenses.EmployeesExpensesID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());