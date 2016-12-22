(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("accTypeResource",
        ["$resource",
        accTypeResource]);

    function accTypeResource($resource) {

        return $resource("/api/AccType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());