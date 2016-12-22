(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("countryCtrl", ["countryResource", "$state", "$rootScope", "$filter", countryCtrl]);
    function countryCtrl(countryResource, $state, $rootScope, $filter) {
        var vm = this;
        vm.test = vm.FF;
        if ($rootScope.FrmList) {
            vm.frm = $filter('filter')($rootScope.FrmList, { state: $state.$current.self.name })[0];
            if (!vm.frm.View) {

                $state.go($rootScope.Rurl);

            }
            else {
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
                vm.CancelButton = false;



                vm.ViewMode = function (activeMode) {
                    // GetList();
                    if (activeMode == 1)//Form View Mode
                    {
                        vm.country = null;
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
                        GetList();
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
                    countryResource.query().$promise.then(function (data) {
                        // success handler
                        vm.countrys = data;
                    }, function (error) {
                        // error handler
                    });
                }


                vm.Save = function (isValid) {
                    if (isValid) {
                        countryResource.save(vm.country).$promise.then(
                            function (data, responseHeaders) {
                                GetList();
                                vm.country = null;
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
                    countryResource.get({ 'ID': id }).$promise.then(function (country) {
                        // success handler
                        vm.country = country;
                        vm.ViewMode(3);
                        toastr.success("Data Load Successful", "Form Load");
                    }, function (error) {
                        // error handler
                        toastr.error(error);
                    });
                }


                vm.Update = function (isValid) {
                    if (isValid) {
                        countryResource.update({ 'ID': vm.country.CountryID }, vm.country).$promise.then(function () {
                            vm.countrys = null;
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
                    // vm.country.$delete({ 'ID': vm.country.CountryID });
                    countryResource.delete({ 'ID': vm.country.CountryID }).$promise.then(function (data) {
                        // success handler
                        toastr.success("Data Delete Successfully!");
                        GetList();
                    }, function (error) {
                        // error handler
                        toastr.error("Data not Delete Successfully!");
                    });;



                }
            }//End
        }
        else {

            alert("Please Login Again!");
            document.getElementById('logoutForm').submit();
        }
        
 

    }//End Function

}());