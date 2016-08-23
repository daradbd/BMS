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
        .controller("employeeCtrl", ["bankAccountResource", "salaryComponentsResource", "salaryComponentDescriptionResource", "attachFileResource", "employeeDetailsResource", "designationResource", "departmentResource", "currencyResource", "languageResource", "countryResource", "cityResource", "companyBranchResource", "collaboratorResource", "$uibModal", "appAuth", employeeCtrl]);

    function employeeCtrl(bankAccountResource, salaryComponentsResource, salaryComponentDescriptionResource, attachFileResource, employeeDetailsResource, designationResource, departmentResource, currencyResource, languageResource, countryResource, cityResource, companyBranchResource, collaboratorResource, $uibModal, appAuth) {
        var vm = this;
        vm.collaborators = [];
        vm.contactsPersons = [];
        vm.bankAccounts = [];
        vm.ListSarch = false;
        vm.companyBranchs = [];
        vm.attachFiles = [];
        vm.Languages = [];
        vm.Currencys = [];
        vm.countrys = [];
        vm.SalaryComponents = [];
        vm.citys = [];
        vm.departments = [];
        vm.designations = [];
        vm.employeeDetails = {};
        appAuth.checkPermission();

        vm.Title = "Employee";


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

        vm.ShowContactsPerson = function() {

            var contactsPersonForm = $uibModal.open({
                templateUrl: "app/HR/contactsPerson.html",
                size: 'lg',
                controller: "contactsPersonCtrl as vm",
                resolve: {
                    contactsFormData: function() {
                        return {
                            FormMode: function() {
                                return 2;
                            }


                        };
                    }
                }
            });

            contactsPersonForm.result.then(function(selectedItem) {

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
            collaboratorResource.query({ '$filter': 'ParentID eq ' + vm.collaborator.CollaboratorID }).$promise.then(function(data) {

                vm.contactsPersons = data;
                //toastr.success("Data Load Successful", "Form Load");
                //vm.cmbCustomer = selectedItem;
                vm.isLoad = false;
            }, function(error) {
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


        vm.selectCity = function(countryId) {

            cityResource.query({ '$filter': 'CountryID eq ' + countryId }).$promise.then(function(data) {
                vm.citys = data;
                //toastr.success("Data function Load Successful", "Form Load");

            }, function(error) {
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
            designationResource.query().$promise.then(function(data) {
                vm.designations = data;

            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        getLanguage();

        function getLanguage() {
            languageResource.query().$promise.then(function(data) {
                vm.Languages = data;
            }, function(error) {
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
            countryResource.query().$promise.then(function(data) {
                vm.countrys = data;
                //toastr.success("Load country", "Country Load");
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.ViewMode = function(activeMode) {
            
            if (activeMode == 1) //Form View Mode
            {
                vm.collaborator = null;
                vm.contactsPersons = [];
                vm.attachFiles = [];
                getSalaryComponents();
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

            if (activeMode == 3) //Details View Mode
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
            if (activeMode == 4) //Edit View Mode
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


        var DispayButton = function() {

        }

        function refreshForm() {
            vm.collaborator = null;
            vm.attachFiles = [];
            vm.contactsPersons = [];
            vm.bankAccounts = [];
            vm.SalaryComponents = [];
            vm.employeeDetails = null;
            vm.cmbDepartments = null;
            vm.cmbLanguages = null;
            vm.cmbCurrencys = null;
            vm.cmbcountrys = null;
            vm.cmbCitys = null;
            vm.cmbReportTo = null;
            vm.cmbCompanyBranch = null;
            vm.cmbDesignations = null;
            
        }

        vm.dobopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.dobopened = !vm.dobopened;

        }

        vm.jdopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.jdopened = !vm.jdopened;

        }

        vm.fileType = function(fileName) {
            return fileName.substr(fileName.lastIndexOf('.') + 1);
        }

        vm.GetNetEarnings = function() {
            var NetEarnings = 0;
            var GrossEarnings = 0;
            var TotalDeductions = 0;
            angular.forEach(vm.SalaryComponents, function(item, key) {

                if (item.IsCTCBase == true && vm.collaborator.CTCAmount > 0) {
                    item.ComponentValue = (item.CTCPercentage * vm.collaborator.CTCAmount * 0.01);

                }
                if (item.PayType.PayTypeID == 2) {
                    GrossEarnings += item.ComponentValue;
                } else if (item.PayType.PayTypeID == 1) {
                    TotalDeductions += item.ComponentValue;
                }


            });
            NetEarnings = GrossEarnings - TotalDeductions;
            return NetEarnings;
        }

        vm.openUpload = function() {

            var fileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            fileUpload.result.then(function(d) {
                vm.collaborator.Image = d.File.UploadFilePath;


            });
        }

        vm.openUploadAttachFile = function() {

            var fileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            fileUpload.result.then(function(d) {
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

        vm.openUploadSignature = function() {

            var fileUpload = $uibModal.open({
                templateUrl: "app/Resources/uploadFile.html",
                size: 'lg',
                controller: "uploadFileCtrl as vm"
            });

            fileUpload.result.then(function(d) {
                vm.collaborator.Signature = d.File.UploadFilePath;


            });
        }

        function getSalaryComponents() {
            salaryComponentsResource.query().$promise.then(function(data) {
                vm.SalaryComponents = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };

        getCompanyBranchList();

        //Get All Data List
        function getCompanyBranchList() {
            companyBranchResource.query({ '$filter': 'CompanyBranchCategoryID ne 5' }).$promise.then(function(data) {
                vm.companyBranchs = data;
                toastr.success("Data Load Successful", "Form Load");

            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        getList();

        //Get All Data List
        function getList() {
            refreshForm();
            collaboratorResource.query({ '$filter': 'IsEmployee eq true' }).$promise.then(function(data) {
                vm.collaborators = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        //Save collaborator
        vm.Save = function(isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                vm.collaborator.IsEmployee = true;


                collaboratorResource.save(vm.collaborator).$promise.then(
                    function(data, responseHeaders) {
                        saveAttachFiles();
                        saveContactsPerson();
                        saveBankAccounts();
                        saveEmployeeDetails();
                        saveSalaryComponents();
                        //refreshForm();

                    }, function(error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            } else {

                toastr.error("Form is not valid");
            }


        }

        function saveContactsPerson() {

            angular.forEach(vm.contactsPersons, function(value, key) {
                value.ParentID = vm.collaborator.CollaboratorID;


                collaboratorResource.update({ 'ID': value.CollaboratorID }, value).$promise.then(function() {

                }, function(error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });

            });
        }
        function saveBankAccounts() {

                angular.forEach(vm.bankAccounts, function (value, key) {
                    value.BankAccountOwnerID = vm.collaborator.CollaboratorID;
                    value.BankAccountOwnerTypeID = 4;

                    bankAccountResource.update({ 'ID': value.BankAccountID }, value).$promise.then(function () {

                }, function(error) {
                    // error handler
                    toastr.error("Bank Account Update Failed!");
                });



            });
        }
        function saveEmployeeDetails() {
            vm.employeeDetails.EmployeeID = vm.collaborator.CollaboratorID;
            employeeDetailsResource.save(vm.employeeDetails).$promise.then(
                function(data, responseHeaders) {

                });

        }

        function saveAttachFiles() {

            angular.forEach(vm.attachFiles, function(value, key) {

                var attachFileInfo = {
                    AttachFileID: value.AttachFileID,
                    DocTypeID: 4,
                    DocID: vm.collaborator.CollaboratorID,
                    AttachFilePath: value.AttachFilePath,
                    AttachFileName: value.AttachFileName
                };


                attachFileResource.save(attachFileInfo).$promise.then(
                    function(data, responseHeaders) {

                    });
            });
        }

        function saveSalaryComponents() {

            angular.forEach(vm.SalaryComponents, function(value, key) {

                var salaryComponentInfo = {
                    SalaryComponentDescriptionID: value.SalaryComponentDescriptionID,
                    SalaryComponentID: value.SalaryComponentID,
                    EmployeeID: vm.collaborator.CollaboratorID,
                    ComponentValue: value.ComponentValue,
                    Formula: value.Formula
                };


                salaryComponentDescriptionResource.save(salaryComponentInfo).$promise.then(
                    function(data, responseHeaders) {

                    });
            });


           

            getList();
            toastr.success("Save Successful");

        }

        //Get Single Record
        vm.Get = function(id) {
            collaboratorResource.get({ 'ID': id }).$promise.then(function(collaborator) {
                vm.collaborator = collaborator;
                getContactsPersonList();
                getBankAccountList();
                getEmployeeDetails(vm.collaborator.CollaboratorID);
                getAttachFiles(vm.collaborator.CollaboratorID);
                vm.selectCity(vm.collaborator.CountryID);
                getSalaryComponent(vm.collaborator.CollaboratorID);

                vm.cmbLanguages = { LanguageID: vm.collaborator.LanguageID };
                vm.cmbCurrencys = { CurrencyID: vm.collaborator.CurrencyID };
                vm.cmbcountrys = { CountryID: vm.collaborator.CountryID };
                vm.cmbCitys = { CityID: vm.collaborator.CityID };
                vm.cmbReportTo = { CollaboratorID: vm.collaborator.ReportToID };
                vm.cmbDepartments = { DepartmentID: vm.collaborator.DepartmentID };
                vm.cmbDesignations = { DesignationID: vm.collaborator.DesignationID };
                vm.cmbCompanyBranch = { CompanyBranchID: vm.collaborator.CompanyBranchID };

                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        function getAttachFiles(employeeId) {
            vm.attachFiles = [];
            attachFileResource.query({ '$filter': 'DocID eq ' + employeeId + ' and DocTypeID eq 1' }).$promise.then(function (data) {
                vm.attachFiles = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };

        function getEmployeeDetails(employeeId) {
            employeeDetailsResource.get({ 'ID': employeeId }).$promise.then(function(data) {
                vm.employeeDetails = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };

        function getSalaryComponent(employeeId) {
            salaryComponentDescriptionResource.query({ 'ID': employeeId }).$promise.then(function(data) {
                vm.SalaryComponents = data;
            }, function(error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        };

        //Data Update
        vm.Update = function(isValid) {
            if (isValid) {
                vm.collaborator.LanguageID = vm.cmbLanguages.LanguageID;
                vm.collaborator.CurrencyID = vm.cmbCurrencys.CurrencyID;
                vm.collaborator.CityID = vm.cmbCitys.CityID;
                vm.collaborator.CountryID = vm.cmbcountrys.CountryID;
                vm.collaborator.IsEmployee = true;

                collaboratorResource.update({ 'ID': vm.collaborator.CollaboratorID }, vm.collaborator).$promise.then(function() {
                    saveAttachFiles();
                    saveContactsPerson();
                    saveBankAccounts();
                    saveEmployeeDetails();
                    saveSalaryComponents();
                   // refreshForm();

                    //vm.collaborators = null;
                    //vm.ViewMode(3);
                    //GetList();
                    toastr.success("Data Update Successful", "Form Update");
                }, function(error) {
                    // error handler
                    toastr.error("Data Update Failed!");
                });
            } else {
                toastr.error("Form is not valid");
            }
        }

        //Data Delete
        vm.Delete = function() {
            // vm.collaborator.$delete({ 'ID': vm.collaborator.CollaboratorID });
            collaboratorResource.delete({ 'ID': vm.collaborator.CollaboratorID }).$promise.then(function(data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                getList();
            }, function(error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
        }

    }

}());