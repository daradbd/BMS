(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (accCOAMappingresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accCOAMappingResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("accCOAMappingCtrl", ["accCOAResource", "accCOAMappingResource", "appAuth", accCOAMappingCtrl]);
    function accCOAMappingCtrl(accCOAResource, accCOAMappingResource, appAuth) {
        var vm = this;
        vm.accCOAMappings = [];
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
                vm.accCOAMapping = null;
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

        var DispayButton = function () {

        }

        GetaccCOAList();

        //Get All Data List
        function GetaccCOAList() {
            accCOAResource.query().$promise.then(function (data) {
                vm.accCOAs = data;
                //toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            accCOAMappingResource.query().$promise.then(function (data, responseHeaders) {
                vm.accCOAMappings = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save accCOAMapping
        vm.Save = function (accCOAMapping) {
            if (accCOAMapping != null) {
                var COAMapping = {
                    COAMappingID: (accCOAMapping.COAMappingID==null?0:accCOAMapping.COAMappingID),
                    AccCOAConfigID: accCOAMapping.AccCOAConfigID,
                    AccCOAID: accCOAMapping.AccCOAID,
                    Prefix: accCOAMapping.Prefix,
                    Suffix: accCOAMapping.Suffix,
                    CreateChild: accCOAMapping.CreateChild,
                };
                accCOAMappingResource.save(COAMapping).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.accCOAMapping = null;
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
            accCOAMappingResource.get({ 'ID': id }).$promise.then(function (accCOAMapping) {
                vm.accCOAMapping = accCOAMapping;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (accCOAMapping) {
            if (accCOAMapping) {
                accCOAMappingResource.update({ 'ID': vaccCOAMapping.accCOAMappingID }, accCOAMapping).$promise.then(function () {
                vm.accCOAMappings = null;
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
            //vm.accCOAMapping.$delete({ 'ID': vm.accCOAMapping.accCOAMappingID });
            accCOAMappingResource.delete({ 'ID': vm.accCOAMapping.accCOAMappingID }).$promise.then(function (data) {
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