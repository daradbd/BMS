(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: tax
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("taxResource",
        ["$resource",
        taxResource]);

    function taxResource($resource) {

        return $resource("/api/Tax/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());