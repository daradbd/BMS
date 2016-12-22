(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: module
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("moduleResource",
        ["$resource",
        moduleResource]);

    function moduleResource($resource) {

        return $resource("/api/Module/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());