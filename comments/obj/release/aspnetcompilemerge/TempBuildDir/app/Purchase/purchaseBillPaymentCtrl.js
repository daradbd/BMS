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
        .controller("purchaseBillPaymentCtrl", ["paymentMethodResource", "projectSetupResource", "collaboratorResource", "purchaseBillPaymentResource", purchaseBillPaymentCtrl]);
    function purchaseBillPaymentCtrl(paymentMethodResource, projectSetupResource, collaboratorResource, purchaseBillPaymentResource) {
        var vm = this;
        vm.purchaseBillPayments = [];
        vm.paymentMethods = [];
        vm.collaborators = [];
        vm.Projects = [];

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
                vm.purchaseBillPayment = null;
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

        vm.dtopen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dtopened = !vm.dtopened;

        }

        var DispayButton = function () {

        }



        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query(function (data) {
                vm.Projects = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetSupplierList();

        //Get All Data List
        function GetSupplierList() {
            collaboratorResource.query({ '$filter': 'IsSupplier eq true' }, function (data) {
                vm.collaborators = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }

        GetPaymentMethod();
        function GetPaymentMethod() {
            paymentMethodResource.query(function (data) {
                vm.paymentMethods = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            purchaseBillPaymentResource.query(function (data) {
                vm.purchaseBillPayments = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save purchaseBillPayment
        vm.Save = function (isValid) {
            if (isValid) {
                purchaseBillPaymentResource.save(vm.purchaseBillPayment,
                    function (data, responseHeaders) {
                        GetList();
                        vm.purchaseBillPayment = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            purchaseBillPaymentResource.get({ 'ID': id }, function (purchaseBillPayment) {
                vm.purchaseBillPayment = purchaseBillPayment;
                vm.cmbSupplier = vm.purchaseBillPayment.Collaborator;
                vm.cmbProject = { ProjectID: vm.purchaseBillPayment.ProjectID };
                vm.GetPaymentMethod(vm.purchaseBillPayment.PaymentMethodID);
                vm.cmbCreditTo = { COAID: vm.purchaseBillPayment.CreditTo };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }

        vm.GetPaymentMethod = function (id) {
            paymentMethodResource.get({ 'ID': id }, function (paymentMethod) {
                vm.paymentMethod = paymentMethod;
                vm.cmbPaymentMethod = vm.paymentMethod;
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            });
        }

        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                purchaseBillPaymentResource.update({ 'ID': vm.purchaseBillPayment.PurchaseBillPaymentID }, vm.purchaseBillPayment);
                vm.purchaseBillPayments = null;
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
            vm.purchaseBillPayment.$delete({ 'ID': vm.purchaseBillPayment.PurchaseBillPaymentID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());