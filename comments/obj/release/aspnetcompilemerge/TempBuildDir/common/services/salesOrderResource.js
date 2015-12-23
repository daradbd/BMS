(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesOrder
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("salesOrderResource",
        ["$resource",
        salesOrderResource]);

    function salesOrderResource($resource) {

        return $resource("/api/SalesOrder/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());