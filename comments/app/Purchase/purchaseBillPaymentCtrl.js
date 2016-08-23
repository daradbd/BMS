(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (purchaseBillPaymentresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseBillPaymentResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("purchaseBillPaymentCtrl", ["ledgerSheetResource", "paymentMethodResource", "projectSetupResource", "collaboratorResource", "purchaseBillPaymentResource", "appAuth", purchaseBillPaymentCtrl]);
    function purchaseBillPaymentCtrl(ledgerSheetResource, paymentMethodResource, projectSetupResource, collaboratorResource, purchaseBillPaymentResource, appAuth) {
        var vm = this;
        vm.purchaseBillPayments = [];
        vm.paymentMethods = [];
        vm.collaborators = [];
        vm.Projects = [];
        vm.ledgerSheets = [];
        vm.Balance = 0.00;
        appAuth.checkPermission();


        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false;
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
                vm.purchaseBillPayment = null;
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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        var DispayButton = function () {

        }

        vm.GetBalance = function (COAID) {

            ledgerSheetResource.query({ 'id': COAID, 'ReportType': 1 }).$promise.then(function (data) {
                vm.Balance = data[2];
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
               // console.log(JSON.stringify(vm.ledgerSheets));
            }, function (error) {
                if (error.status == 500) {
                    toastr.error("No Data Found!");
                }
                else {
                    toastr.error("Data Load Failed!");
                }
                // error handler

            });
        }

        vm.setCredit = function () {
            if (vm.Balance < vm.purchaseBillPayment.PaymentTotal) {
                vm.purchaseBillPayment.CreditAmount = 0.00;
            }
            else {
                vm.purchaseBillPayment.CreditAmount = (vm.purchaseBillPayment.PaymentTotal - vm.purchaseBillPayment.CreditAmount);
            }
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query().$promise.then(function (data) {
                vm.Projects = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetSupplierList();

        //Get All Data List
        function GetSupplierList() {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
               // toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
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


        GetList();

        //Get All Data List
        function GetList() {
            purchaseBillPaymentResource.query().$promise.then(function (data) {
                vm.purchaseBillPayments = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save purchaseBillPayment
        vm.Save = function (isValid) {
            if (isValid) {
                vm.purchaseBillPayment.SupplierID = vm.cmbSupplier.CollaboratorID;
                purchaseBillPaymentResource.save(vm.purchaseBillPayment).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseBillPayment = null;
                        vm.ViewMode(2);
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
            purchaseBillPaymentResource.get({ 'ID': id }).$promise.then(function (purchaseBillPayment) {
                vm.purchaseBillPayment = purchaseBillPayment;
                vm.cmbSupplier = vm.purchaseBillPayment.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseBillPayment.ProjectID };
                vm.GetPaymentMethod(vm.purchaseBillPayment.PaymentMethodID);
                vm.cmbCreditTo = { COAID: vm.purchaseBillPayment.CreditTo };
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
                vm.purchaseBillPayment.SupplierID = vm.cmbSupplier.CollaboratorID;
                purchaseBillPaymentResource.update({ 'ID': vm.purchaseBillPayment.PurchaseBillPaymentID }, vm.purchaseBillPayment).$promise.then(function () {
                vm.purchaseBillPayments = null;
                vm.ViewMode(2);
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
            //vm.purchaseBillPayment.$delete({ 'ID': vm.purchaseBillPayment.PurchaseBillPaymentID });
            purchaseBillPaymentResource.delete({ 'ID': vm.purchaseBillPayment.PurchaseBillPaymentID }).$promise.then(function (data) {
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