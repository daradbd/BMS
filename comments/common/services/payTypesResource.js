(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payTypes
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("payTypesResource",
        ["$resource",
        payTypesResource]);

    function payTypesResource($resource) {

        return $resource("/api/PayTypes/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());