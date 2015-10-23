(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("companyTypeCtrl", ["companyTypeResource", companyTypeCtrl]);
    function companyTypeCtrl(companyTypeResource) {
        var vm = this;
        vm.companyTypes = [];

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



        vm.ViewMode = function (activeMode) {
            GetList();
            if (activeMode == 1)//Form View Mode
            {
                vm.companyType = null;
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
            companyTypeResource.query(function (data) {
                vm.companyTypes = data;
                toastr.success("Data function Load Successful", "Form Load");

            });
        }


        vm.Save = function (isValid) {
            if (isValid) {
                companyTypeResource.save(vm.companyType,
                    function (data, responseHeaders) {
                        GetList();
                       // var idd = JSON.parse(responseHeaders.id);
                        //alert(idd);
                        vm.companyType = null;
                        toastr.success("Save Successful");
                    });
            }
            else {

                toastr.error("Form is not valid");
            }


        }

        vm.Get = function (id) {
            companyTypeResource.get({ 'ID': id }, function (companyType) {
                vm.companyType = companyType;
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
                companyTypeResource.update({ 'ID': vm.companyType.CompanyTypeID }, vm.companyType);
                vm.companyTypes = null;
                vm.ViewMode(3);
                GetList();
                toastr.success("Data Update Successful", "Form Update");
            }
            else {
                toastr.error("Form is not valid");
            }
        }


        vm.Delete = function () {
            vm.companyType.$delete({ 'ID': vm.companyType.CompanyTypeID });
            toastr.error("Data Delete Successfully!");
            GetList();
            vm.ViewMode(1);
        }

    }

}());