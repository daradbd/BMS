(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (supplierFileresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: supplierFileResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("supplierFileCtrl", ["supplierFileResource", supplierFileCtrl]);
    function supplierFileCtrl(supplierFileResource) {
        var vm = this;
        vm.supplierFiles = [];
        vm.supplierFilesProjectBy = [];
        vm.ProjectDetails = [];

        vm.Title = "Supplier File";
        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = false,
        vm.ProjectView= false,
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;
        vm.CancelButton = true;



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.supplierFile = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.ProjectView =false;
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
                vm.ProjectView = false;
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
                vm.ProjectView = false;
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
                vm.ProjectView = false;
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
            supplierFileResource.query().$promise.then(function (data) {
                vm.supplierFiles = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.GetBySupplier = function (SupplierID) {

            supplierFileResource.query({ 'id': SupplierID, 'ReportType': 1 }).$promise.then(function (data) {
               // vm.Balance = data[2];
                //vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
                // console.log(JSON.stringify(vm.ledgerSheets));
                vm.supplierFilesProjectBy = data;
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

        vm.GetByProject = function (SupplierID,ProjectID) {

            supplierFileResource.query({ 'id': SupplierID, 'ProjectID': ProjectID, 'ReportType': 1 }).$promise.then(function (data) {
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



        //Save supplierFile
        vm.Save = function (isValid) {
            if (isValid) {
                supplierFileResource.save(vm.supplierFile,
                    function (data, responseHeaders) {
                        GetList();
                        vm.supplierFile = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            supplierFileResource.get({ 'ID': id }, function (supplierFile) {
                vm.supplierFile = supplierFile;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                supplierFileResource.update({ 'ID': vm.supplierFile.supplierFileID }, vm.supplierFile);
                vm.supplierFiles = null;
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
            vm.supplierFile.$delete({ 'ID': vm.supplierFile.supplierFileID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());