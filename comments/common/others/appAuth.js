(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: appAuth
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("appAuth",
        ["$state", "$rootScope", "$filter",
        appAuth]);

    function appAuth($state, $rootScope, $filter) {

        return {
        checkPermission: function() {
            // $location.path(redirectToUrlAfterLogin.url);
            if ($rootScope.FrmList) {
               //var frm = $filter('filter')($rootScope.FrmList, { state: $state.$current.self.name })[0];
               if (!$filter('filter')($rootScope.FrmList, { state: $state.$current.self.name })[0].View) {

                    $state.go($rootScope.Rurl);

                }
            }
            else {

                
                document.getElementById('logoutForm').submit();
                alert("Please Login Again!");
            }

        }
    };
    }
}());