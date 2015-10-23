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
        .controller("userAuthenticationCtrl", ["userAuthorizeResource", "$window", "$location", userAuthenticationCtrl]);
    function userAuthenticationCtrl(userAuthorizeResource,$window, $location) {
        var vm = this;
        //$window.location.href = "/Account/Login/";
       // checkLogin();
        vm.userAuthentications = [];
        vm.CompanyName = "RLSolution";
        vm.UserName = "Darad";
        
        function checkLogin() {
            // $window.location.href = "/Account/Login/";
            // $location.absUrl() = 'http://www.google.com';
           // $location.path()
        }


    }

}());