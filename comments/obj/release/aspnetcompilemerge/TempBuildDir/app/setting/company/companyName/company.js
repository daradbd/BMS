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
        vm.CancelButton = false;

        vm.selectCity = function(countryID) {
            
            cityResource.query({ '$filter': 'CountryID eq ' + countryID }).$promise.then(function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        GetCompanyCategorys();
        function GetCompanyCategorys() {
            companyCategoryResource.query().$promise.then(function (data) {
                vm.CompanyCategorys = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        GetCompanyType();
        function GetCompanyType() {
            companyTypeResource.query().$promise.then(function (data) {
                vm.CompanyTypes = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            })

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


        GetList();

        //Get All Data List
        function GetList() {
            companyResource.query().$promise.then(function (data) {
                vm.companys = data;
                //vm.cmbcountrys = vm.countrys[2];
                vm.selectCity(1);
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save company
        vm.Save = function (isValid) {
            if (isValid) {
                 vm.company.LanguageID = vm.cmbLanguages.LanguageID;
                 vm.company.CurrencyID = vm.cmbCurrencys.CurrencyID;
                 vm.company.CityID = vm.cmbCitys.CityID;
                 vm.company.CountryID = vm.cmbcountrys.CountryID;

                 companyResource.save(vm.company).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.company = null;
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
            companyResource.get({ 'ID': id }).$promise.then(function (company) {
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
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.company.LanguageID = vm.cmbLanguages.LanguageID;
                vm.company.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.company.CityID = vm.cmbCitys.CityID;
                vm.company.CountryID = vm.cmbcountrys.CountryID;
                companyResource.update({ 'ID': vm.company.CompanyID }, vm.company).$promise.then(function () {
                vm.companys = null;
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
           // vm.company.$delete({ 'ID': vm.company.CompanyID });
            companyResource.delete({ 'ID': vm.company.CompanyID }).$promise.then(function (data) {
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