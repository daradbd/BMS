(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("companyCategoryCtrl", ["companyCategoryResource", "appAuth", companyCategoryCtrl]);
    function companyCategoryCtrl(companyCategoryResource, appAuth) {
        var vm = this;
        vm.companyCategorys = [];
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



        vm.ViewMode=function (activeMode) {
            GetList();
            if(activeMode==1)//Form View Mode
            {
                vm.companyCategory = null;
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
            if(activeMode==2) //List View Mode
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

        var DispayButton=function()
        {

        }
        //var companyCategor = new companyCategoryResource();

              //companyCategoryResource.query(function (data) {
              //    vm.companyCategorys = data;
              //    toastr.success("Data Load Successful","Form Load");

              //});
        
        GetList();

        function GetList () {
            companyCategoryResource.query().$promise.then(function (data) {
                vm.companyCategorys = data;
                toastr.success("Data function Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }
      
      
        vm.Save = function (isValid) {
            if (isValid) {
                companyCategoryResource.save(vm.companyCategory).$promise.then(
                    function (data,responseHeaders) {
                        GetList();
                        var idd =JSON.parse( responseHeaders.id);
                        alert(idd);
                        vm.companyCategory = null;
                        toastr.success("Save Successful");
                    }, function (error) {
                        // error handler
                        toastr.error("Data Save Failed!");
                    });
            }
            else
            {
                
                toastr.error("Form is not valid");
            }

            
        }

        vm.Get = function (id) {
            companyCategoryResource.get({ 'ID': id }).$promise.then(function (companyCategory) {
            vm.companyCategory = companyCategory;
            //vm.FromView = true;
            //vm.EditView = false;
            //vm.ListView = false;
            //vm.DetailsView = true;
            vm.ViewMode(3);
            toastr.success("Data Load Successful", "Form Load");
            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }


        vm.Update = function (isValid) {
            if (isValid) {
                companyCategoryResource.update({ 'ID': vm.companyCategory.CompanyCategoryID }, vm.companyCategory).$promise.then(function () {
                vm.companyCategorys = null;
                vm.ViewMode(3);
                GetList();
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


        vm.Delete = function () {
            //vm.companyCategory.$delete({ 'ID': vm.companyCategory.CompanyCategoryID });
            companyCategoryResource.delete({ 'ID': vm.companyCategory.CompanyCategoryID }).$promise.then(function (data) {
                // success handler
                toastr.success("Data Delete Successfully!");
                GetList();
            }, function (error) {
                // error handler
                toastr.error("Data Delete Failed!");
            });
         }

    }

}());