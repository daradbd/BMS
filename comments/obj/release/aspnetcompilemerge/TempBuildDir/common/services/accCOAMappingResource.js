(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accCOAMapping
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("accCOAMappingResource",
        ["$resource",
        accCOAMappingResource]);

    function accCOAMappingResource($resource) {

        return $resource("/api/AccCOAMapping/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());