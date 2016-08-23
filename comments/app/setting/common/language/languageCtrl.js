(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("languageCtrl", ["languageResource", "appAuth", languageCtrl]);
    function languageCtrl(languageResource, appAuth) {
        var vm = this;
        vm.languages = [];
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
                vm.language = null;
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
        //var companyCategor = new companyCategoryResource();

        //companyCategoryResource.query(function (data) {
        //    vm.companyCategorys = data;
        //    toastr.success("Data Load Successful","Form Load");

        //});

        GetList();

        function GetList() {
            languageResource.query().$promise.then(function (data) {
                vm.languages = data;
                //toastr.success("Language Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Language not Load Successful", "Form Load Error");
            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                languageResource.save(vm.language).$promise.then(
                    function (data, responseHeaders) {
                        GetList();
                        vm.language = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data not Save Successfully!");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.Get = function (id) {
            languageResource.get({ 'ID': id }).$promise.then(function (language) {
                vm.language = language;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data not Load Successfully!");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                languageResource.update({ 'ID': vm.language.LanguageID }, vm.language).$promise.then(function () {
                vm.languages = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
                }, function (error) {
                    // error handler
                    toastr.error("Data not Update Successfully!");
                });
                }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
           // vm.language.$delete({ 'ID': vm.language.LanguageID });
            languageResource.delete({ 'ID': vm.country.CountryID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data not Delete Successfully!");
            });
        }

    }

}());