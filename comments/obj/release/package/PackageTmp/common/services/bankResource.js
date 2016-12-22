(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bank
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankResource",
        ["$resource",
        bankResource]);

    function bankResource($resource) {

        return $resource("/api/Bank/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());