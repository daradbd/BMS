(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: customerType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("customerTypeResource",
        ["$resource",
        customerTypeResource]);

    function customerTypeResource($resource) {

        return $resource("/api/CustomerType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());