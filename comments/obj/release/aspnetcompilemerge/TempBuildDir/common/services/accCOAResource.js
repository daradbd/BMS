(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: accCOA
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("accCOAResource",
        ["$resource",
        accCOAResource]);

    function accCOAResource($resource) {

        return $resource("/api/AccCOA/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());