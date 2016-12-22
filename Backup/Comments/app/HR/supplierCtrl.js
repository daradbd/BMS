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
        .controller("supplierCtrl", ["supplierTypeResource", "currencyResource", "languageResource", "countryResource", "cityResource", "collaboratorResource", "appAuth", supplierCtrl]);
    function supplierCtrl(supplierTypeResource, currencyResource, languageResource, countryResource, cityResource, collaboratorResource, appAuth) {
        var vm = this;
        vm.collaborators = [];
        vm.Languages = [];
        vm.Currencys = [];
        vm.countrys = [];
        vm.citys = [];

        appAuth.checkPermission();

            vm.Title = "Supplier";
       
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
        vm.CancelButton = false;

        getSupplierType();
        function getSupplierType() {
            supplierTypeResource.query().$promise.then(function (data) {
                vm.SupplierTypes = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });

        }

        vm.selectCity = function (countryId) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryId }).$promise.then(function (data) {
                vm.citys = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });
        }

        getLanguage();
        function getLanguage() {
            languageResource.query().$promise.then(function (data) {
                vm.Languages = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });

        }

        getCurrency();
        function getCurrency() {
            currencyResource.query().$promise.then(function(data) {
                vm.Currencys = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });

        }
        getcountrysList();
        function getcountrysList() {
            countryResource.query().$promise.then(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });
        }

        vm.ViewMode = function (activeMode) {
            getList();
            if (activeMode === 1)//Form View Mode
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
                vm.CancelButton = true;
            }
            if (activeMode === 2) //List View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = false;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
                vm.CancelButton = false;
            }

            if (activeMode === 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = false;
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = true;
                vm.UpdateButton = false;
                vm.DeleteButton = true;
                vm.CancelButton = true;
            }
            if (activeMode === 4)//Edit View Mode
            {
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = false;
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
                vm.CancelButton = true;
            }
        }

        //var DispayButton = function () {

        //}


        getList();

        //Get All Data List
        function getList() {
            collaboratorResource.query({ '$filter': "IsSupplier eq true" }).$promise.then(function (data) {
                vm.collaborators = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });
        }

        //Save collaborator
        vm.Save = function (isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                vm.collaborator.SupplierTypeID = vm.cmbSupplierTypes.SupplierTypeID;
                vm.collaborator.IsSupplier = true;
               
                collaboratorResource.save(vm.collaborator).$promise.then(
                    function (data) {
                        vm.collaborator = data;
                        getList();
                        vm.collaborator = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Load Failed!" + error);
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        //Get Single Record
        vm.Get = function (id) {
            collaboratorResource.get({ 'ID': id }).$promise.then(function (collaborator) {
                vm.collaborator = collaborator;

                vm.selectCity(vm.collaborator.CountryID);
               
                vm.cmbLanguages = { LanguageID: vm.collaborator.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.collaborator.CurrencyID };
                vm.cmbcountrys = { CountryID: vm.collaborator.CountryID };
                vm.cmbCitys = { CityID: vm.collaborator.CityID };
                vm.cmbSupplierTypes = { SupplierTypeID:vm.collaborator.SupplierTypeID };
               // vm.cmbSupplierTypes=

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!" + error);
            });
        }


        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                vm.collaborator.SupplierTypeID = vm.cmbSupplierTypes.SupplierTypeID;
                vm.collaborator.IsSupplier = true;
                collaboratorResource.update({ 'ID': vm.collaborator.CollaboratorID }, vm.collaborator).$promise.then(function () {
                vm.collaborators = null;
                vm.ViewMode(3);
                getList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!" + error);
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function () {
            //vm.collaborator.$delete({ 'ID': vm.collaborator.CollaboratorID });
            collaboratorResource.delete({ 'ID': vm.collaborator.CollaboratorID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!" + data);
                getList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!" + error);
            });
        }

    }

}());