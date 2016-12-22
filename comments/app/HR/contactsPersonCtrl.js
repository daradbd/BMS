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
        .controller("contactsPersonCtrl", ["designationResource", "departmentResource", "companyBranchResource", "attachFileResource", "customerTypeResource", "currencyResource", "languageResource", "countryResource", "cityResource", "collaboratorResource", "contactsFormData", "$uibModal", "$uibModalInstance", "appAuth", contactsPersonCtrl]);
    function contactsPersonCtrl(designationResource, departmentResource, companyBranchResource, attachFileResource, customerTypeResource, currencyResource, languageResource, countryResource, cityResource, collaboratorResource,contactsFormData, $uibModal, $uibModalInstance, appAuth) {
        var vm = this;
        vm.collaborators = [];
        vm.Employees = [];
        vm.attachFiles = [];
        vm.ListSarch = false;
        vm.Languages = [];
        vm.Currencys = [];
        vm.countrys = [];
        vm.citys = [];
        vm.CustomerTypes = [];
        vm.isModal = true;
        vm.isLoad = true;
        //appAuth.checkPermission();

        vm.Title = "Contacts Person";

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

        vm.selectCity = function (countryId) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryId }).$promise.then(function (data) {
                vm.citys = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        getCustomerType();
        function getCustomerType() {
            customerTypeResource.query().$promise.then(function (data) {
                vm.CustomerTypes = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        getLanguage();
        function getLanguage() {
            languageResource.query().$promise.then(function (data) {
                vm.Languages = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }

        getCurrency();
        function getCurrency() {
            currencyResource.query().$promise.then(function(data) {
                vm.Currencys = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });

        }
        getcountrysList();
        function getcountrysList() {
            countryResource.query().$promise.then(function (data) {
                vm.countrys = data;
                // toastr.success("Load country", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");

            });
        }

        getDepartment();
        function getDepartment() {
            departmentResource.query().$promise.then(function(data) {
                vm.departments = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };
        getDesignation();
        function getDesignation() {
            designationResource.query().$promise.then(function (data) {
                vm.designations = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.ViewMode = function (activeMode) {
            getList();
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
                vm.CancelButton = true;
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
                vm.CancelButton = false;
                vm.CancelButton = false;
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
                vm.CancelButton = true;
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
                vm.CancelButton = true;
            }
        }

        var DispayButton = function () {

        }

        vm.openUploadAttachFile = function () {

            var fileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            fileUpload.result.then(function (d) {
                //vm.collaborator.Image = d.File.UploadFilePath;
                vm.attachFiles.unshift({
                    AttachFileID: 0,
                    DocTypeID: 1,
                    DocID: 0,
                    AttachFilePath: d.File.UploadFilePath,
                    AttachFileName: d.File.Remarks
                });

            });
        }


        getCompanyBranchList();

        //Get All Data List
        function getCompanyBranchList() {
            companyBranchResource.query({ '$filter': 'CompanyBranchCategoryID ne 5' }).$promise.then(function (data) {
                vm.companyBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        getEmployeeList();

        //Get All Data List
        function getEmployeeList() {

            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function (data) {
                vm.Employees = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        getList();

        //Get All Data List
        function getList() {

            collaboratorResource.query({ '$filter': 'IsCustomer eq true' }).$promise.then(function (data) {
                vm.collaborators = data;
                // toastr.success("Data function Load Successful", "Form Load");
                vm.isLoad = false;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
                vm.isLoad = false;
            });
        }

        //Save collaborator
        vm.Save = function (isValid) {
            if (isValid) {
                vm.isLoad = true;
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                //vm.collaborator.CustomerTypeID = vm.cmbCustomerTypes.CustomerTypeID;
                //vm.collaborator.IsCustomer = true;

                collaboratorResource.save(vm.collaborator).$promise.then(
                    function (data, responseHeaders) {
                        saveAttachFiles();
                        getList();
                        vm.collaborator = null;
                        toastr.success("Save Successful");
                        vm.isLoad = false;
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                        vm.isLoad = false;
                    });
            }
            else {

                toastr.error("Form is not valid");
                vm.isLoad = false;
            }


        }

        function saveAttachFiles() {

            angular.forEach(vm.attachFiles, function(value, key) {

                var attachFileInfo = {
                    AttachFileID: value.AttachFileID,
                    DocTypeID: 1,
                    DocID: vm.collaborator.CollaboratorID,
                    AttachFilePath: value.AttachFilePath,
                    AttachFileName: value.AttachFileName
                };


                attachFileResource.save(attachFileInfo).$promise.then(
                    function(data, responseHeaders) {

                    });

                vm.attachFiles = null;
            });
        }


        //Save collaborator
        vm.SaveClose = function (isValid) {
            if (isValid) {
                vm.isLoad = true;
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                //vm.collaborator.CustomerTypeID = vm.cmbCustomerTypes.CustomerTypeID;
                //vm.collaborator.IsCustomer = true;

                collaboratorResource.save(vm.collaborator).$promise.then(
                    function (data, responseHeaders) {
                        //GetList();
                        vm.collaborator = data;
                        $uibModalInstance.close(vm.collaborator);
                        toastr.success("Save Successful");
                        vm.isLoad = false;
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                        vm.isLoad = false;
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.SelectClose = function () {
            $uibModalInstance.close(vm.collaborator);
        }

        vm.ListItemSelectClose = function (collaborator) {
            $uibModalInstance.close(collaborator);
        }

        vm.mClose = function () {
            $uibModalInstance.dismiss();
        }
        //Get Single Record
        vm.Get = function (id) {
            vm.isLoad = true;
            collaboratorResource.get({ 'ID': id }).$promise.then(function (collaborator) {
                vm.collaborator = collaborator;

                vm.selectCity(vm.collaborator.CountryID);
                
                vm.cmbLanguages = { LanguageID: vm.collaborator.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.collaborator.CurrencyID };
                vm.cmbcountrys = { CountryID: vm.collaborator.CountryID };
                vm.cmbCitys = { CityID: vm.collaborator.CityID };
                //vm.cmbCustomerTypes = { CustomerTypeID: vm.collaborator.CustomerTypeID };
                vm.ViewMode(3);
                // toastr.success("Data Load Successful", "Form Load");
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
                vm.isLoad = false;
            });
        }



        //Data Update
        vm.Update = function (isValid) {
            if (isValid) {
                vm.isLoad = true;
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                //vm.collaborator.CustomerTypeID = vm.cmbCustomerTypes.CustomerTypeID;
               // vm.collaborator.IsCustomer = true;
                collaboratorResource.update({ 'ID': vm.collaborator.CollaboratorID }, vm.collaborator).$promise.then(function () {
                    vm.collaborators = null;
                    vm.ViewMode(3);
                    getList();
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
            vm.isLoad = true;
            vm.collaborator.$delete({ 'ID': vm.collaborator.CollaboratorID });
            collaboratorResource.delete({ 'ID': vm.collaborator.CollaboratorID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                getList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }


    angular
    .module("companyManagement")
    .controller("modalCtrl", ["$uibModalInstance", modalCtrl]);

    function modalCtrl($uibModalInstance) {
        var md = this;
        md.SaveClose = function () {
            $uibModalInstance.close();
        }

    }

}());