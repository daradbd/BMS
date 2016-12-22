(function () {
    "use strict";

    /**
     *  @Module Name (MainModule)
     *  @controller Name (Ctrl)
     *  @dependence (userAuthenticationresource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: userLoginResource
     *  @date: 9/4/2015
     */

    angular
        .module("companyManagement")
        .controller("userAuthenticationCtrl", ["formUserPermissionResource", "userAuthorizeResource", "$window", "$uibModal", "$location", "$scope", "$rootScope", "$filter", "$templateCache", userAuthenticationCtrl]);
    function userAuthenticationCtrl(formUserPermissionResource, userAuthorizeResource, $window, $uibModal, $location, $scope, $rootScope, $templateCache, $filter) {
        
        var vm = this;
        vm.frm = false;
        
        $rootScope.IsPermit = false;
        $rootScope.Rurl = "comments";
        vm.alert = function () {
            alert("Hi");
        }
        $scope.$on('LOAD', function() {
            $scope.loading = true;
        });
        $scope.$on('UNLOAD', function () {
            $scope.loading = false;
        });
        //$window.location.href = "/Account/Login/";
       // checkLogin();
        vm.userAuthentications = [];
        vm.FF = [];
        vm.CompanyName = "Artistic";
        vm.UserName = "Darad";
        vm.ShowMenu = function () {

            $uibModal.open({
                templateUrl: "app/setting/common/menu/menu.html",
                controller: "menuCtrl as vm"
               
            });
        }

        GetList();
        function GetList() {
            formUserPermissionResource.query().$promise.then(function (data) {
                $rootScope.FrmList = data;
                vm.FF = data;
               // toastr.success("Data Load Successful", "Form Load");

            }, function (error) {
                // error handler
                toastr.error("Data Load Failed!");
            });
        }

        vm.checkMenu = function (MenuState) {
            if (vm.FF.length == 0) {
                formUserPermissionResource.query().$promise.then(function (data) {
                    vm.FF = data;
                    vm.frm = $filter('filter')(vm.FF, { state: MenuState })[0].View;
                    return vm.frm;
                });
                
            }
            else {
                vm.frm = $filter('filter')(vm.FF, { state: MenuState })[0].View;
                return vm.frm;
            }
           
            

        }

        vm.logout = function () {
            
            document.getElementById('logoutForm').submit();
            //$templateCache.removeAll();
        }
        function checkLogin() {
            // $window.location.href = "/Account/Login/";
            // $location.absUrl() = 'http://www.google.com';
           // $location.path()
        }


    }

}());