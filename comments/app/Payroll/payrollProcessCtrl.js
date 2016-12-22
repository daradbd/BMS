(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (payrollProcessresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payrollProcessResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("payrollProcessCtrl", ["payrollProcessResource", "payrollProcessDescriptionResource", "$filter", payrollProcessCtrl]);
    function payrollProcessCtrl(payrollProcessResource,payrollProcessDescriptionResource, $filter) {
        var vm = this;
        vm.payrollProcesss = [];
        vm.headCells=[];
        vm.rows =[];
        vm.payrollProcessDescriptions = [];
        vm.payrollProcess = {};

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
        vm.ExportButton = false;



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.payrollProcess = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = true;
                vm.ExportButton = true;
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
                vm.ExportButton = false;
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
                vm.ExportButton = true;
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
                vm.ExportButton = true;
            }
        }

        vm.sopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.sopened = !vm.sopened;

        }

        var DispayButton = function () {

        }

        vm.TotalEarning = function (values) {
            var TotlaEarning = 0.00;
            angular.forEach(values, function (item, key) {
               
                if (item.SalaryComponent.PayTypeID ==2) {
                    TotlaEarning += item.ComponentValue;

                }
                

            });

            return TotlaEarning;
        }
        vm.TotalDeduction = function (values) {
            var TotalDeduction = 0.00;
            angular.forEach(values, function (item, key) {
               
                if (item.SalaryComponent.PayTypeID ==1) {
                    TotalDeduction += item.ComponentValue;

                }
                

            });

            return TotalDeduction;
        }
        vm.TotalNetPay = function (values) {
            var TotlaEarning = 0.00;
            var TotalNetPay = 0.00;
            var TotalDeduction = 0.00;
            angular.forEach(values, function (item, key) {
               
                if (item.SalaryComponent.PayTypeID ==2) {
                    TotlaEarning += item.ComponentValue;

                }
               else if (item.SalaryComponent.PayTypeID == 1) {
                    TotalDeduction += item.ComponentValue;

                }
                

            });

            TotalNetPay = TotlaEarning - TotalDeduction;
            return TotalNetPay;
        }
      
        vm.sortByComponent = function (values) {
            return _.sortBy(values, function (value) {
                return value.SalaryComponentID;
            });
        }
        vm.GetPayrollProcessList = function () {

            var my = $filter('date')(vm.payrollProcess.MonthYear, "MMMM-yyyy");
            payrollProcessDescriptionResource.query({ 'MonthYear': my }).$promise.then(function (data) {
                vm.payrollProcessDescriptions = data;
                vm.headCells = _.keys(_.groupBy(vm.payrollProcessDescriptions, function(item){ return item.SalaryComponent.SalaryComponentName}));
                vm.rows = _.groupBy(vm.payrollProcessDescriptions, function(item){ return item.EmployeeID});
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            payrollProcessResource.query().$promise.then(function (data) {
                vm.payrollProcesss = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save payrollProcess
        vm.Save = function (isValid) {
            if (isValid) {
                vm.payrollProcess.MonthYear=$filter('date')(vm.payrollProcess.MonthYear, "MMMM-yyyy")
                payrollProcessResource.save(vm.payrollProcess).$promise.then(
                    function (data, responseHeaders) {
                        vm.GetPayrollProcessList();
                        GetList();
                       // vm.payrollProcess = null;
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
            payrollProcessResource.get({ 'ID': id }).$promise.then(function (payrollProcess) {
                vm.payrollProcess = payrollProcess;
                vm.GetPayrollProcessList();
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
                payrollProcessResource.update({ 'ID': vm.payrollProcess.PayrollProcessID }, vm.payrollProcess).$promise.then(function () {
                    //vm.payrollProcesss = null;
                vm.GetPayrollProcessList();
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
            
            payrollProcessResource.delete({ 'ID': vm.payrollProcess.PayrollProcessID }).$promise.then(function (data) {
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