(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (salesReceivePaymentresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesReceivePaymentResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("salesReceivePaymentCtrl", ["projectSetupResource", "collaboratorResource", "salesReceivePaymentResource", salesReceivePaymentCtrl]);
    function salesReceivePaymentCtrl(projectSetupResource, collaboratorResource, salesReceivePaymentResource) {
        var vm = this;
        vm.salesReceivePayments = [];
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
                vm.salesReceivePayment = null;
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

        GetCustomerList();
        //Get All Data List
        function GetCustomerList() {
            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }, function (data) {
                vm.collaborators = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        GetProjectList();
        //Get All Data List
        function GetProjectList() {
            projectSetupResource.query(function (data) {
                vm.Projects = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        var DispayButton = function () {

        }


        GetList();

        //Get All Data List
        function GetList() {
            salesReceivePaymentResource.query(function (data) {
                vm.salesReceivePayments = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save salesReceivePayment
        vm.Save = function (isValid) {
            if (isValid) {
                salesReceivePaymentResource.save(vm.salesReceivePayment,
                    function (data, responseHeaders) {
                        GetList();
                        vm.salesReceivePayment = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            salesReceivePaymentResource.get({ 'ID': id }, function (salesReceivePayment) {
                vm.salesReceivePayment = salesReceivePayment;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                salesReceivePaymentResource.update({ 'ID': vm.salesReceivePayment.SalesReceivePaymentID }, vm.salesReceivePayment);
                vm.salesReceivePayments = null;
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
            vm.salesReceivePayment.$delete({ 'ID': vm.salesReceivePayment.SalesReceivePaymentID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());