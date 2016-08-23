(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("cityCtrl", ["countryResource", "cityResource", "appAuth", cityCtrl]);
    function cityCtrl(countryResource, cityResource, appAuth) {
        var vm = this;
        vm.citys = [];
        vm.city = [];
        vm.countrys = [];
        vm.serial = 1;
        vm.num = 5;
        appAuth.checkPermission();
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

        vm.indexCount = function (newPageNumber) {
            vm.serial = 1;
            vm.serial = newPageNumber * vm.num - (vm.num-1);
        }
        GetcountrysList();
        function GetcountrysList() {
            countryResource.query().$promise.then(function (data) {
                vm.countrys = data;
                //toastr.success("Load country", "Country Load");
            }, function (error) {
                // error handler
                toastr.error("Country not Load Successfully!");
            });
        }


        vm.ChangeCountry=function()
        {
            if (vm.city)
            {
                vm.city.CountryID = vm.cmbcountrys.CountryID;
                vm.countryName = vm.cmbcountrys.CountryName;
            }


        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.cmbcountrys = null;
                vm.city = null;
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
            cityResource.query().$promise.then(function (data) {
                vm.citys = data;
                //vm.cunt.CountryID = vm.citys.CountryID;
                //toastr.success("Data function Load Successful", "Form Load");

            }), function (error) {
                // error handler
                toastr.error("Data not Delete Successfully!");
            };
        }


        vm.Save = function (isValid) {
            if (isValid) {
                vm.city.CountryID = vm.cmbcountrys.CountryID;
                cityResource.save(vm.city).$promise.then(
                    function (data,responseHeaders) {
                        GetList();
                       
                        vm.city = null;
                        vm.ViewMode(2);
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
            cityResource.get({ 'ID': id }).$promise.then(function (city) {
                vm.city = city;
                //vm.cmbcountrys = { CountryID: vm.city.CountryID };
                vm.cmbcountrys = vm.city.Country;
                //vm.FromView = true;
                //vm.EditView = false;
                //vm.ListView = false;
                //vm.DetailsView = true;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data not Load Successfully!");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                cityResource.update({ 'ID': vm.city.CityID }, vm.city).$promise.then(function () {
                    vm.citys = null;
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
            //vm.city.$delete({ 'ID': vm.city.CityID });
            countryResource.delete({ 'ID': vm.city.CityID }).$promise.then(function (data) {
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