(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: payOrder
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("payOrderResource",
        ["$resource",
        payOrderResource]);

    function payOrderResource($resource) {

        return $resource("/api/PayOrder/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());