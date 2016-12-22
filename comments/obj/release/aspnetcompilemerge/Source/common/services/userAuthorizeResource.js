(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: userAuthorize
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("userAuthorizeResource",
        ["$resource",
        userAuthorizeResource]);

    function userAuthorizeResource($resource) {

        return $resource("/api/UserAuthorize/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());