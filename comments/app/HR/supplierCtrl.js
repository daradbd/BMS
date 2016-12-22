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
        .controller("supplierCtrl", ["bankAccountResource", "attachFileResource", "supplierTypeResource", "designationResource", "currencyResource", "languageResource", "countryResource", "cityResource", "collaboratorResource", "$uibModal", "appAuth", supplierCtrl]);
    function supplierCtrl(bankAccountResource, attachFileResource,supplierTypeResource, designationResource, currencyResource, languageResource, countryResource, cityResource, collaboratorResource,$uibModal, appAuth) {
        var vm = this;
        vm.collaborators = [];
        vm.contactsPersons = [];
        vm.bankAccounts = [];
        vm.attachFiles = [];
        vm.ListSarch = false;
        vm.Languages = [];
        vm.Currencys = [];
        vm.countrys = [];
        vm.citys = [];
        vm.designations = [];
        vm.SupplierTypes = [];
        vm.isModal = false;
        vm.isLoad = true;

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

        GetDesignation();
        function GetDesignation() {
            designationResource.query().$promise.then(function (data) {
                vm.designations = data;

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
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

        vm.ShowontactsPerson = function () {

            var ContactsPersonForm = $uibModal.open({
                templateUrl: "app/HR/contactsPerson.html",
                size: 'lg',
                controller: "contactsPersonCtrl as vm",
                resolve: {
                    contactsFormData: function () {
                        return {
                            FormMode: function () {
                                return 2;
                            }


                        };
                    }
                }
            });

            ContactsPersonForm.result.then(function (selectedItem) {

                for (var i = vm.contactsPersons.length; i--;) {
                    if (vm.contactsPersons[i].CollaboratorID === selectedItem.CollaboratorID) {
                        vm.contactsPersons.splice(i, 1);
                    }
                }

                vm.contactsPersons.unshift(selectedItem);

            });
        }

        function getContactsPersonList() {
            vm.isLoad = true;
            collaboratorResource.query({ '$filter': 'ParentID eq ' + vm.collaborator.CollaboratorID }).$promise.then(function (data) {

                vm.contactsPersons = data;
                //toastr.success("Data Load Successful", "Form Load");
                //vm.cmbCustomer = selectedItem;
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
        vm.ShowBankAccount = function () {

            var bankAccountForm = $uibModal.open({
                templateUrl: "app/Accounting/Configuration/Banks/bankAccount.html",
                size: 'lg',
                controller: "bankAccountModalCtrl as vm",
                resolve: {
                    bankAccountFormData: function () {
                        return {
                            FormMode: function () {
                                return 2;
                            }


                        };
                    }
                }
            });

            bankAccountForm.result.then(function (selectedItem) {

                for (var i = vm.bankAccounts.length; i--;) {
                    if (vm.bankAccounts[i].BankAccountID === selectedItem.BankAccountID) {
                        vm.bankAccounts.splice(i, 1);
                    }
                }

                vm.bankAccounts.unshift(selectedItem);

            });
        }
        function getBankAccountList() {
            vm.isLoad = true;
            bankAccountResource.query({ '$filter': 'BankAccountOwnerID eq ' + vm.collaborator.CollaboratorID }).$promise.then(function (data) {

                vm.bankAccounts = data;
                //toastr.success("Data Load Successful", "Form Load");
                //vm.cmbCustomer = selectedItem;
                vm.isLoad = false;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.openUploadAttachFile = function () {

            var FileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            FileUpload.result.then(function (d) {
                //vm.collaborator.Image = d.File.UploadFilePath;
                vm.attachFiles.unshift({
                    AttachFileID: 0,
                    DocTypeID: 2,
                    DocID: 0,
                    AttachFilePath: d.File.UploadFilePath,
                    AttachFileName: d.File.Remarks,
                });

            });
        }


        function getAttachFiles(customerId) {
            vm.attachFiles = [];
            attachFileResource.query({ '$filter': 'DocID eq ' + customerId + ' and DocTypeID eq 2' }).$promise.then(function (data) {
                vm.attachFiles = data;
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };

        vm.ViewMode = function (activeMode) {
           
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
                getList();
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

        function refreshForm() {
            vm.collaborator = null;
            vm.attachFiles = [];
            vm.contactsPersons = [];
            vm.bankAccounts = [];

            vm.cmbCompany = null;
            vm.cmbSupplierType = null;
            vm.designations = null;
            vm.cmbDepartments = null;
            vm.cmbLanguages = null;
            vm.cmbCurrencys = null;
            vm.cmbcountrys = null;
            vm.cmbCitys = null;
            vm.cmbReportTo = null;
            vm.cmbCompanyBranch = null;
            vm.cmbDesignations = null;

        }

        vm.fileType = function (fileName) {
            return fileName.substr(fileName.lastIndexOf('.') + 1);
        }
        getList();

        //Get All Data List
        function getList() {
            refreshForm();
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
                       
                        //refreshForm();
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

        function saveAttachFiles() {

            angular.forEach(vm.attachFiles, function (value, key) {

                var attachFileInfo = {
                    AttachFileID: value.AttachFileID,
                    DocTypeID: 2,
                    DocID: vm.collaborator.CollaboratorID,
                    AttachFilePath: value.AttachFilePath,
                    AttachFileName: value.AttachFileName,
                };


                attachFileResource.save(attachFileInfo).$promise.then(
                    function (data, responseHeaders) {

                    });

                vm.attachFiles = [];
            });
        }

        function saveBankAccounts() {

            angular.forEach(vm.bankAccounts, function (value, key) {
                value.BankAccountOwnerID = vm.collaborator.CollaboratorID;
                value.BankAccountOwnerTypeID = 2;

                bankAccountResource.update({ 'ID': value.BankAccountID }, value).$promise.then(function () {

                }, function (error) {
                    // error handler
                    toastr.error("Bank Account Update Failed!");
                });



            });
        }

        function saveContactsPerson() {

            angular.forEach(vm.contactsPersons, function (value, key) {
                value.ParentID = vm.collaborator.CollaboratorID;


                collaboratorResource.update({ 'ID': value.CollaboratorID }, value).$promise.then(function () {

                }, function (error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });

            });
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