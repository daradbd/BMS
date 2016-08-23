(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (bankBranchresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankBranchResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("bankBranchCtrl", ["countryResource", "cityResource", "bankResource", "bankBranchResource", "appAuth", bankBranchCtrl]);
    function bankBranchCtrl(countryResource, cityResource, bankResource, bankBranchResource, appAuth) {
        var vm = this;
        vm.bankBranchs = [];
        vm.banks = [];
        vm.countrys = [];
        vm.citys = [];
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
                vm.bankBranch = null;
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


        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }).$promise.then(function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
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

        GetcountrysList();
        function GetcountrysList() {
            countryResource.query().$promise.then(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            bankBranchResource.query().$promise.then(function (data) {
                vm.bankBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save bankBranch
        vm.Save = function (isValid) {
            if (isValid) {
              
                vm.bankBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.bankBranch.CityID = vm.cmbCitys.CityID;

                bankBranchResource.save(vm.bankBranch).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.bankBranch = null;
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
            bankBranchResource.get({ 'ID': id }).$promise.then(function (bankBranch) {
                vm.bankBranch = bankBranch;
                vm.cmbBanks = { BankID: vm.bankBranch.BankID };
                vm.cmbcountrys = { CountryID: vm.bankBranch.CountryID };
                vm.selectCity(vm.bankBranch.CountryID);
                vm.cmbCitys = { CityID: vm.bankBranch.CityID };
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
                vm.bankBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.bankBranch.CityID = vm.cmbCitys.CityID;

                bankBranchResource.update({ 'ID': vm.bankBranch.BankBranchID }, vm.bankBranch).$promise.then(function () {
                vm.bankBranchs = null;
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
            //vm.bankBranch.$delete({ 'ID': vm.bankBranch.bankBranchID });
            bankBranchResource.delete({ 'ID': vm.bankBranch.BankBranchID }).$promise.then(function (data) {
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