(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (companyBranchresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyBranchResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("companyBranchCtrl", ["companyBranchCategoryResource", "currencyResource", "languageResource", "companyBranchTypeResource", "countryResource", "cityResource", "companyResource", "companyBranchResource", "appAuth", companyBranchCtrl]);
    function companyBranchCtrl(companyBranchCategoryResource, currencyResource, languageResource, companyBranchTypeResource, countryResource, cityResource, companyResource, companyBranchResource, appAuth) {
        var vm = this;
        vm.companyBranchs = [];
        vm.companys = [];
        vm.countrys = [];
        vm.citys = [];
        vm.CompanyBranchTypes = [];
        vm.Languages = [];
        vm.Currencys = [];
        appAuth.checkPermission();
        vm.cmbParentBranch={CompanyBranchID:0,CompanyBranchName:"Parent"};

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

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }


        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.companyBranch = null;
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

        GetLanguage();
        function GetLanguage() {
            languageResource.query().$promise.then(function (data) {
                vm.Languages = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        GetCurrency();
        function GetCurrency() {
            currencyResource.query().$promise.then(function (data) {
                vm.Currencys = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })

        }

        GetcompanyBranchType();
        function GetcompanyBranchType() {
            companyBranchTypeResource.query().$promise.then(function (data) {
                vm.CompanyBranchTypes = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
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

        GetCompanys();
        function GetCompanys() {
            companyResource.query().$promise.then(function (data) {
                vm.companys = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        GetCompanyBranchCategorys();
        function GetCompanyBranchCategorys() {
            companyBranchCategoryResource.query().$promise.then(function (data) {
                vm.companyBranchCategorys = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetList();

        //Get All Data List
        function GetList() {
            companyBranchResource.query({ '$filter': 'CompanyBranchCategoryID ne 5'}).$promise.then(function (data) {
                vm.companyBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save companyBranch
        vm.Save = function (isValid) {
            if (isValid) {
                vm.companyBranch.CompanyID = vm.cmbCompany.CompanyID;
                vm.companyBranch.ParentBranchID = vm.cmbParentBranch.CompanyBranchID;
                vm.companyBranch.CompanyBranchTypeID = vm.cmbCompanyBranchTypes.CompanyBranchTypeID;
                vm.companyBranch.CompanyBranchCategoryID = vm.cmbCompanyBranchCategorys.CompanyBranchCategoryID;
                vm.companyBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.companyBranch.CityID = vm.cmbCitys.CityID;
                vm.companyBranch.LanguageID = vm.cmbLanguages.LanguageID;
                vm.companyBranch.CurrencyID = vm.cmbCurrencys.CurrencyID;

                companyBranchResource.save(vm.companyBranch).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.companyBranch = null;
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
            companyBranchResource.get({ 'ID': id }).$promise.then(function (companyBranch) {
                vm.companyBranch = companyBranch;
                vm.cmbCompany = { CompanyID: companyBranch.CompanyID };
                vm.cmbParentBranch = { CompanyBranchID: vm.companyBranch.ParentBranchID };
                vm.cmbCompanyBranchTypes = { CompanyBranchTypeID: vm.companyBranch.CompanyBranchTypeID };
                vm.cmbCompanyBranchCategorys = { CompanyBranchCategoryID: vm.companyBranch.CompanyBranchCategoryID };
                vm.cmbcountrys = { CountryID: vm.companyBranch.CountryID };
                vm.selectCity(vm.companyBranch.CountryID);
                vm.cmbCitys = { CityID: vm.companyBranch.CityID };
                vm.cmbLanguages = { LanguageID: vm.companyBranch.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.companyBranch.CurrencyID };

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Save Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.companyBranch.CompanyID = vm.cmbCompany.CompanyID;
                vm.companyBranch.ParentBranchID = vm.cmbParentBranch.CompanyBranchID;
                vm.companyBranch.CompanyBranchTypeID = vm.cmbCompanyBranchTypes.CompanyBranchTypeID;
                vm.companyBranch.CompanyBranchCategoryID = vm.cmbCompanyBranchCategorys.CompanyBranchCategoryID;
                vm.companyBranch.CountryID = vm.cmbcountrys.CountryID;
                vm.companyBranch.CityID = vm.cmbCitys.CityID;
                vm.companyBranch.LanguageID = vm.cmbLanguages.LanguageID;
                vm.companyBranch.CurrencyID = vm.cmbCurrencys.CurrencyID;
                companyBranchResource.update({ 'ID': vm.companyBranch.CompanyBranchID }, vm.companyBranch).$promise.then(function () {
                vm.companyBranchs = null;
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
            //vm.companyBranch.$delete({ 'ID': vm.companyBranch.CompanyBranchID });
            companyBranchResource.delete({ 'ID': vm.companyBranch.CompanyBranchID }).$promise.then(function (data) {
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