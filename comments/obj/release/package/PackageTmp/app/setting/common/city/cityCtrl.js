(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("cityCtrl", ["countryResource", "cityResource", cityCtrl]);
    function cityCtrl(countryResource, cityResource) {
        var vm = this;
        vm.citys = [];
        vm.city = [];
        vm.countrys = [];
  
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
        GetcountrysList();
        function GetcountrysList() {
            countryResource.query(function (data) {
                vm.countrys = data;
                toastr.success("Load country", "Country Load");
            });
        }


        vm.ChangeCountry=function()
        {
            vm.city.CountryID = vm.cmbcountrys.CountryID;
            vm.countryName = vm.cmbcountrys.CountryName;

        }

        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.city = null;
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
        //var companyCategor = new companyCategoryResource();

        //companyCategoryResource.query(function (data) {
        //    vm.companyCategorys = data;
        //    toastr.success("Data Load Successful","Form Load");

        //});

        GetList();

        function GetList() {
            cityResource.query(function (data) {
                vm.citys = data;
                //vm.cunt.CountryID = vm.citys.CountryID;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                cityResource.save(vm.city,
                    function (data,responseHeaders) {
                        GetList();
                       
                        vm.city = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.Get = function (id) {
            cityResource.get({ 'ID': id }, function (city) {
                vm.city = city;
                vm.cmbcountrys = { CountryID: vm.city.CountryID };
                //vm.countryName = vm.cmbcountrys.CountryName;
                //vm.FromView = true;
                //vm.EditView = false;
                //vm.ListView = false;
                //vm.DetailsView = true;
                vm.ViewMode(3);
                toastr.success("Data Load Successful", "Form Load");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                cityResource.update({ 'ID': vm.city.CityID }, vm.city);
                vm.citys = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
            vm.city.$delete({ 'ID': vm.city.CityID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());