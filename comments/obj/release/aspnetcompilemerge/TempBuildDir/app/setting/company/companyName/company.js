(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (companyresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: companyResource
     *  @date: 12/4/2015
     */

    angular
        .module("companyManagement")
        .controller("companyCtrl", ["currencyResource", "languageResource", "companyTypeResource", "companyCategoryResource", "countryResource", "cityResource", "companyResource", companyCtrl]);
    function companyCtrl(currencyResource, languageResource, companyTypeResource, companyCategoryResource, countryResource, cityResource, companyResource) {
        var vm = this;
        vm.companys = [];
        vm.countrys = [];
        vm.citys = [];
        vm.CompanyCategorys = [];
        vm.CompanyCategory = [];
        vm.CompanyTypes = [];
        vm.Languages = [];
        vm.Currencys = [];
        vm.company = [];

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

        vm.selectCity = function(countryID) {
            
            cityResource.query({ '$filter': 'CountryID eq '+countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }


        GetCompanyCategorys();
        function GetCompanyCategorys() {
            companyCategoryResource.query(function (data) {
                vm.CompanyCategorys = data;
            });
        }

        GetCompanyType();
        function GetCompanyType() {
            companyTypeResource.query(function (data) {
                vm.CompanyTypes = data;
            })

        }

        GetLanguage();
        function GetLanguage() {
            languageResource.query(function (data) {
                vm.Languages = data;
            });

        }

        GetCurrency();
        function GetCurrency() {
            currencyResource.query(function (data) {
                vm.Currencys = data;
            })

        }
        GetcountrysList();
        function GetcountrysList() {
            countryResource.query(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            });
        }
       // vm.GetCityList = GetCityList();
       //// GetCityList();

       // function GetCityList() {
       //     cityResource.query({ '$filter': 'CountryID eq 1'}, function (data) {
       //         vm.citys = data;
       //         toastr.success("Data function Load Successful", "Form Load");

       //     });
       // }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.company = null;
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


        GetList();

        //Get All Data List
        function GetList() {
            companyResource.query(function (data) {
                vm.companys = data;
                //vm.cmbcountrys = vm.countrys[2];
                vm.selectCity(1);
                toastr.success("Data Load Successful", "Form Load");

            });
        }

        //Save company
        vm.Save = function (isValid) {
            if (isValid) {
                 vm.company.LanguageID = vm.cmbLanguages.LanguageID;
                 vm.company.CurrencyID = vm.cmbCurrencys.CurrencyID;
                 vm.company.CityID = vm.cmbCitys.CityID;
                 vm.company.CountryID = vm.cmbcountrys.CountryID;

                companyResource.save(vm.company,
                    function (data, responseHeaders) {
                        GetList();
                        vm.company = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            companyResource.get({ 'ID': id }, function (company) {
                vm.company = company;
                vm.selectCity(vm.company.CountryID);
                vm.cmbCompanyCategory = { CompanyCategoryID: vm.company.CompanyCategoryID };
                vm.cmbCompanyTypes = { CompanyTypeID: vm.company.CompanyTypeID };
                vm.cmbLanguages = { LanguageID: vm.company.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.company.CurrencyID };
                vm.cmbcountrys = { CountryID: vm.company.CountryID };
                vm.cmbCitys = { CityID: vm.company.CityID };
                vm.CompanyCategory = vm.cmbCompanyCategory;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.company.LanguageID = vm.cmbLanguages.LanguageID;
                vm.company.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.company.CityID = vm.cmbCitys.CityID;
                vm.company.CountryID = vm.cmbcountrys.CountryID;
                companyResource.update({ 'ID': vm.company.CompanyID }, vm.company);
                vm.companys = null;
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
            vm.company.$delete({ 'ID': vm.company.CompanyID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());