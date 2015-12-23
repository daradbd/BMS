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
        .controller("userAuthenticationCtrl", ["userAuthorizeResource", "$window", "$uibModal", "$location", "$scope", "$rootScope", userAuthenticationCtrl]);
    function userAuthenticationCtrl(userAuthorizeResource, $window, $uibModal, $location, $scope,$rootScope) {
        $rootScope.IsPermit = false;
        var vm = this;
        $scope.$on('LOAD', function() {
            $scope.loading = true;
        });
        $scope.$on('UNLOAD', function () {
            $scope.loading = false;
        });
        //$window.location.href = "/Account/Login/";
       // checkLogin();
        vm.userAuthentications = [];
        vm.CompanyName = "Artistic";
        vm.UserName = "Darad";
        vm.ShowMenu = function () {

            $uibModal.open({
                templateUrl: "app/setting/common/menu/menu.html",
                controller: "menuCtrl as vm"
               
            });
        }

        function checkLogin() {
            // $window.location.href = "/Account/Login/";
            // $location.absUrl() = 'http://www.google.com';
           // $location.path()
        }


    }

}());