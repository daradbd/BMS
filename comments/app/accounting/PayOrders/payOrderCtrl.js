(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (payOrderCategoryresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payOrderResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("payOrderCtrl", ["payOrderCategoryResource", "bankResource", "collaboratorResource", "payOrderResource", "$filter", "$uibModal", "appAuth", payOrderCtrl]);
    function payOrderCtrl(payOrderCategoryResource, bankResource, collaboratorResource, payOrderResource, $filter, $uibModal, appAuth) {
        var vm = this;
        vm.payOrders = [];
        vm.collaborators = [];
        vm.employeeList = [];
        vm.PayOrderCategorys = [];
        vm.ListSarch = false;

        // appAuth.checkPermission();
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

            if (activeMode == 1)//Form View Mode
            {
                vm.payOrder = null;
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
                GetList();
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
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
                vm.DetailsView = true;
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
                vm.DetailsView = false;
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

        vm.UpdatePercentage = function () {
            vm.payOrder.Amount=( vm.payOrder.AgainstAmount * vm.payOrder.PayOrderPercentage)* 0.01;

        }

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }
        vm.dtopenF = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopenedF = !vm.dtopenedF;

        }
        vm.dtopenFt = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopenedFt = !vm.dtopenedFt;

        }

        vm.dtropen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtropened = !vm.dtropened;

        }

        // Daterange filter
        vm.dateRangeFilter = function (property, startDate, endDate) {

            return function (item) {
                if (item[property] === null) return false;

                var itemDate =$filter('date')(item[property], "dd/MM/yyyy") ;

                var s =$filter('date')(startDate, "dd/MM/yyyy");
                var e = $filter('date')(endDate, "dd/MM/yyyy");
                if (s === undefined && e === undefined) {

                    return true;
                    // do something 
                }
                else if (s != undefined && e === undefined)
                {
                    if (itemDate >= s) return true;
                }
                else if (s === undefined && e != undefined)
                {
                    if ( itemDate <= e) return true;
                }
                if (s != undefined && e != undefined)
                {
                    if (itemDate >= s && itemDate <= e) return true;
                }

                return false;
            }
        }

        vm.Balance = function () {
            var total = 0.00;
            

            angular.forEach(vm.filteredList, function (item, key) {
                total += (item.Amount - (item.ReturnAmount));
               

            });
           
            return total;
        }


        vm.ShowCompanyForm = function () {

            var CustomerForm = $uibModal.open({
                templateUrl: "app/HR/customer.html",
                size: 'lg',
                controller: "customerModalCtrl as vm",
                resolve: {
                    customerFormData: function () {
                        return {
                            FormMode: function () {
                                return 2;
                            },
                            IsCompany: function () {
                                return true;
                            }


                        };
                    }
                },
            });

            CustomerForm.result.then(function (selectedItem) {
                vm.isLoad = true;
                collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                   
                    vm.collaborators = data;
                    //toastr.success("Data Load Successful", "Form Load");
                    vm.cmbCompany = selectedItem;
                   // vm.cmbCompany = { CollaboratorID: selectedItem.CollaboratorID };

                    vm.isLoad = false;
                }, function (error) {
                    // error handler
                    toastr.error("Data Load Failed!");
                });

            });
        }

        GetbanksList();
        function GetbanksList() {
            bankResource.query().$promise.then(function (data) {
                vm.banks = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })
        }

        GetCompanyList();
        //Get All CompnayList
        function GetCompanyList() {
            
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
                // toastr.success("Data function Load Successful", "Form Load");
                vm.isLoad = false;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
                vm.isLoad = false;
            });
        }

        getEmployeeList();

        //Get All Data EmployeeList
        function getEmployeeList() {
            
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.employeeList = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetPayOrderCategoryList();

        //Get AllPayOrderCategoryList
        function GetPayOrderCategoryList() {
            payOrderCategoryResource.query().$promise.then(function (data) {
                vm.PayOrderCategorys = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            payOrderResource.query().$promise.then(function (data) {
                vm.payOrders = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save payOrderCategory
        vm.Save = function (isValid) {
            if (isValid) {
                vm.payOrder.PayOrderCompanyID = vm.cmbCompany.CollaboratorID;
                vm.payOrder.SalesPersonID = vm.cmbSalePerson.CollaboratorID;
                vm.payOrder.PayOrderCategoryID = vm.cmbPayOrderCategory.PayOrderCategoryID;
                payOrderResource.save(vm.payOrder).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.payOrder = null;
                        vm.ViewMode(2);
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
            payOrderResource.get({ 'ID': id }).$promise.then(function (payOrder) {
                vm.payOrder = payOrder;
                vm.cmbCompany = { CollaboratorID: vm.payOrder.PayOrderCompanyID };
                vm.cmbSalePerson = { CollaboratorID: vm.payOrder.SalesPersonID };
                vm.cmbBanks = { BankID: vm.payOrder.PayOrderBankID };
                vm.cmbPayOrderCategory = { PayOrderCategoryID: vm.payOrder.PayOrderCategoryID };

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
                payOrderResource.update({ 'ID': vm.payOrder.PayOrderID }, vm.payOrder).$promise.then(function () {
                    vm.payOrder = null;
                    vm.ViewMode(3);
                    GetList();
                    vm.ViewMode(2);
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
            // vm.payOrder.$delete({ 'ID': vm.payOrder.PayOrderID });
            payOrderResource.delete({ 'ID': vm.payOrder.PayOrderID }).$promise.then(function (data) {
                // success handler
                vm.ViewMode(2);
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());