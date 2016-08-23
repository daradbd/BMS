(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (employeesExpensesPaymentresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeesExpensesPaymentResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("employeesExpensesPaymentCtrl", ["paymentMethodResource", "employeesExpensesResource", "employeesExpensesPaymentResource", "appAuth", employeesExpensesPaymentCtrl]);
    function employeesExpensesPaymentCtrl(paymentMethodResource,employeesExpensesResource, employeesExpensesPaymentResource, appAuth) {
        var vm = this;
        vm.employeesExpensesPayments = [];
        vm.employeesExpensess = [];
        vm.employeesExpensesPayment = {};

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
               // vm.employeesExpensesPayment = null;
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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        var DispayButton = function () {

        }

        vm.checkLimit = function() {
            if (vm.employeesExpenses.DueAmount < vm.employeesExpensesPayment.PaymentAmount)
            {
                vm.employeesExpensesPayment.PaymentAmount = "";
            }
        }

        GetPaymentMethod();
        function GetPaymentMethod() {
            paymentMethodResource.query().$promise.then(function (data) {
                vm.paymentMethods = data;
                // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetExpensesList();

        //Get All Data List
        function GetExpensesList() {
            employeesExpensesResource.query().$promise.then(function (data) {
                vm.employeesExpensess = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            employeesExpensesPaymentResource.query().$promise.then(function (data) {
                vm.employeesExpensesPayments = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }



        //Save employeesExpensesPayment
        vm.Save = function (isValid) {
            if (isValid) {
                employeesExpensesPaymentResource.save(vm.employeesExpensesPayment).$promise.then(
                    function (data, responseHeaders) {
                        
                        vm.employeesExpensesPayment = null;
                        vm.employeesExpenses = null;
                        toastr.success("Save Successful");
                        GetList();
                        vm.ViewMode(4);
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
        vm.GetExpenses = function (id) {
            vm.employeesExpensesPayment = {};
            GetEmpExpenses(id);
            vm.ViewMode(1);
        }

        function GetEmpExpenses(id) {
           
            employeesExpensesResource.get({ 'ID': id }).$promise.then(function (employeesExpenses) {
                vm.employeesExpenses = employeesExpenses;
                vm.employeesExpensesPayment.EmployeeID = vm.employeesExpenses.Employee.CollaboratorID;
                vm.employeesExpensesPayment.EmployeesExpensesID = vm.employeesExpenses.EmployeesExpensesID;

                //vm.cmbEmployee = vm.employeesExpenses.Employee;
                //vm.GetExpensesDesc(vm.employeesExpenses.EmployeesExpensesID);
               
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Get Single Record
        vm.Get = function (id) {
            vm.employeesExpensesPayment = {};
            employeesExpensesPaymentResource.get({ 'ID': id }).$promise.then(function (employeesExpensesPayment) {
                vm.employeesExpensesPayment = employeesExpensesPayment;
                GetEmpExpenses(vm.employeesExpensesPayment.EmployeesExpensesID);
               // vm.cmbSupplier = vm.purchaseBillPayment.Collaborator;
               
                vm.GetPaymentMethod(vm.employeesExpensesPayment.PaymentMethodID);
                vm.cmbCreditTo = { COAID: vm.employeesExpensesPayment.CreditTo };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetPaymentMethod = function (id) {
            paymentMethodResource.get({ 'ID': id }).$promise.then(function (paymentMethod) {
                vm.paymentMethod = paymentMethod;
                vm.cmbPaymentMethod = vm.paymentMethod;
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                employeesExpensesPaymentResource.update({ 'ID': vm.employeesExpensesPayment.EmployeesExpensesPaymentID }, vm.employeesExpensesPayment).$promise.then(function () {
                vm.employeesExpensesPayments = null;
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
           // vm.employeesExpensesPayment.$delete({ 'ID': vm.employeesExpensesPayment.EmployeesExpensesPaymentID });
            employeesExpensesPaymentResource.delete({ 'ID':  vm.employeesExpensesPayment.EmployeesExpensesPaymentID}).$promise.then(function (data) {
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