(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accCOAConfig
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("accCOAConfigResource",
        ["$resource",
        accCOAConfigResource]);

    function accCOAConfigResource($resource) {

        return $resource("/api/AccCOAConfig/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());