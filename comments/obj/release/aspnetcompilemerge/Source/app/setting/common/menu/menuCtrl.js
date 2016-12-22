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
        .controller("menuCtrl", ["$modalInstance",  menuCtrl]);
    function menuCtrl($modalInstance) {
        var vm = this;

        vm.CloseMenu = function () {
            $modalInstance.dismiss('cancel');
        };
      

    }

}());