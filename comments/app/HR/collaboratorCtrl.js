(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (collaboratorresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: collaboratorResource
     *  @date: 9/4/2015
     */


    angular
        .module("companyManagement")
        .controller("collaboratorCtrl", ["currencyResource", "languageResource", "countryResource", "cityResource", "collaboratorResource", "collaboratorType", collaboratorCtrl]);
    function collaboratorCtrl(currencyResource, languageResource, countryResource, cityResource, collaboratorResource, collaboratorType) {
        var vm = this;
        vm.collaborators = [];
        vm.Languages = [];
        vm.Currencys = [];
        vm.countrys = [];
        vm.citys = [];

        
        if (collaboratorType == 1)
        {
            vm.Title = "Supplier";
        }
        else if (collaboratorType == 2)
        {
            vm.Title = "Customer";
                    
        }
        else if (collaboratorType == 3) {
            vm.Title = "Employee";

        }
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

        vm.selectCity = function (countryID) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryID }, function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
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

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.collaborator = null;
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
            var filterby = '';
            if (collaboratorType == 1) {
                filterby = 'IsSupplier eq true';
            }
            else if (collaboratorType == 2) {
                filterby = 'IsCustomer eq true';

            }
            else if (collaboratorType == 3) {
                filterby = 'IsEmployee eq true';

            }
            collaboratorResource.query({ '$filter': filterby }, function (data) {
                vm.collaborators = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }

        //Save collaborator
        vm.Save = function (isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                if (collaboratorType == 1)
                {
                    vm.collaborator.IsSupplier = true;
                }
                else if (collaboratorType == 2)
                {
                    vm.collaborator.IsCustomer = true;
                    
                }
                else if (collaboratorType == 3) {
                    vm.collaborator.IsEmployee = true;

                }
                collaboratorResource.save(vm.collaborator,
                    function (data, responseHeaders) {
                        GetList();
                        vm.collaborator = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            collaboratorResource.get({ 'ID': id }, function (collaborator) {
                vm.collaborator = collaborator;

                vm.selectCity(vm.collaborator.CountryID);
               
                vm.cmbLanguages = { LanguageID: vm.collaborator.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.collaborator.CurrencyID };
                vm.cmbcountrys = { CountryID: vm.collaborator.CountryID };
                vm.cmbCitys = { CityID: vm.collaborator.CityID };

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                if (collaboratorType == 1) {
                    vm.collaborator.IsSupplier = true;
                }
                else if (collaboratorType == 2) {
                    vm.collaborator.IsCustomer = true;

                }
                else if (collaboratorType == 3) {
                    vm.collaborator.IsEmployee = true;

                }
                collaboratorResource.update({ 'ID': vm.collaborator.CollaboratorID }, vm.collaborator);
                vm.collaborators = null;
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
            vm.collaborator.$delete({ 'ID': vm.collaborator.CollaboratorID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());