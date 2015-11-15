(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("countryCtrl", ["countryResource", countryCtrl]);
    function countryCtrl(countryResource) {
        var vm = this;
        vm.countrys = [];

        // View Mode Control Variable // 
        vm.FromView = false;
        vm.ListView = true;
        vm.DetailsView = true;
        vm.EditView = false;

        // Action Button Control Variable //
        vm.SaveButton = false;
        vm.EditButton = false;
        vm.UpdateButton = false;
        vm.DeleteButton = false;



        vm.ViewMode = function (activeMode) {
           // GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.country = null;
                vm.FromView = true;
                vm.ListView = false;
                vm.DetailsView = true;
                vm.EditView = true;

                vm.SaveButton = true;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
            }
            if (activeMode == 2) //List View Mode
            {
                GetList();
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = true;
                vm.EditView = false;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = false;
                vm.DeleteButton = false;
            }

            if (activeMode == 3)//Details View Mode
            {
                vm.FromView = false;
                vm.ListView = true;
                vm.DetailsView = true;
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
                vm.DetailsView = true;
                vm.EditView = true;


                vm.SaveButton = false;
                vm.EditButton = false;
                vm.UpdateButton = true;
                vm.DeleteButton = true;
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
            countryResource.query(function (data) {
                vm.countrys = data;
                vm.Get(vm.countrys[0].CountryID);
                toastr.success("Country Load Successful", "Form Load");

            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                countryResource.save(vm.country,
                    function (data, responseHeaders) {
                        GetList();
                        vm.country = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.Get = function (id) {
            countryResource.get({ 'ID': id }, function (country) {
                vm.country = country;
                //vm.FromView = true;
                //vm.EditView = false;
                //vm.ListView = false;
                //vm.DetailsView = true;
                vm.ViewMode(3);
                //toastr.success("Data Load Successful", "Form Load");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                countryResource.update({ 'ID': vm.country.CountryID }, vm.country);
                vm.countrys = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
            vm.country.$delete({ 'ID': vm.country.CountryID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());