(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (customerFileresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: customerFileResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("customerFileCtrl", ["customerFileResource", customerFileCtrl]);
    function customerFileCtrl(customerFileResource) {
        var vm = this;
        vm.customerFiles = [];
        vm.customerFilesProjectBy = [];
        vm.ProjectDetails = [];

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
        vm.CancelButton = true;
        vm.BackButton = false;



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.customerFile = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.BackButton = false;
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
                vm.BackButton = false;
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
                vm.BackButton = false;
            }
            if (activeMode == 5)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.ProjectView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.BackButton = true;
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
                vm.BackButton = false;
            }
        }

        var DispayButton = function () {

        }


        GetList();

        //Get All Data List
        function GetList() {
            customerFileResource.query(function (data) {
                vm.customerFiles = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        vm.GetByCustomer = function (CustomerID) {

            customerFileResource.query({ 'id': CustomerID, 'ReportType': 1 }).$promise.then(function (data) {
                // vm.Balance = data[2];
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
                // console.log(JSON.stringify(vm.ledgerSheets));
                vm.customerFilesProjectBy = data;
                vm.ViewMode(3);
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

        vm.GetByProject = function (CustomerID, ProjectID) {

            customerFileResource.query({ 'id': CustomerID, 'ProjectID': ProjectID, 'ReportType': 1 }).$promise.then(function (data) {
                // vm.Balance = data[2];
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
                // console.log(JSON.stringify(vm.ledgerSheets));

                vm.ProjectDetails = data;
                vm.ViewMode(5);
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


        //Save customerFile
        vm.Save = function (isValid) {
            if (isValid) {
                customerFileResource.save(vm.customerFile,
                    function (data, responseHeaders) {
                        GetList();
                        vm.customerFile = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            customerFileResource.get({ 'ID': id }, function (customerFile) {
                vm.customerFile = customerFile;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                customerFileResource.update({ 'ID': vm.customerFile.customerFileID }, vm.customerFile);
                vm.customerFiles = null;
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
            vm.customerFile.$delete({ 'ID': vm.customerFile.customerFileID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());