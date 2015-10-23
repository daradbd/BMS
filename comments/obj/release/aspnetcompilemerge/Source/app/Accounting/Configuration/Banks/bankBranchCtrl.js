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
        .controller("bankBranchCtrl", ["countryResource", "cityResource", "bankResource", "bankBranchResource", bankBranchCtrl]);
    function bankBranchCtrl(countryResource, cityResource, bankResource, bankBranchResource) {
        var vm = this;
        vm.bankBranchs = [];
        vm.banks = [];
        vm.countrys = [];
        vm.citys = [];

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
                vm.bankBranch = null;
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

        var DispayButton = function () {

        }


        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }

        GetbanksList();
        function GetbanksList() {
            bankResource.query(function (data) {
                vm.banks = data;
            })
        }

        GetcountrysList();
        function GetcountrysList() {
            countryResource.query(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            });
        }

        GetList();

        //Get All Data List
        function GetList() {
            bankBranchResource.query(function (data) {
                vm.bankBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save bankBranch
        vm.Save = function (isValid) {
            if (isValid) {
              
                vm.bankBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.bankBranch.CityID = vm.cmbCitys.CityID;

                bankBranchResource.save(vm.bankBranch,
                    function (data, responseHeaders) {
                        GetList();
                        vm.bankBranch = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            bankBranchResource.get({ 'ID': id }, function (bankBranch) {
                vm.bankBranch = bankBranch;
                vm.cmbBanks = { BankID: vm.bankBranch.BankID };
                vm.cmbcountrys = { CountryID: vm.bankBranch.CountryID };
                vm.selectCity(vm.bankBranch.CountryID);
                vm.cmbCitys = { CityID: vm.bankBranch.CityID };
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.bankBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.bankBranch.CityID = vm.cmbCitys.CityID;

                bankBranchResource.update({ 'ID': vm.bankBranch.BankBranchID }, vm.bankBranch);
                vm.bankBranchs = null;
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
            vm.bankBranch.$delete({ 'ID': vm.bankBranch.bankBranchID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());