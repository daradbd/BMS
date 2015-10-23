(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesDelivery
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesDeliveryResource",
        ["$resource",
        salesDeliveryResource]);

    function salesDeliveryResource($resource) {

        return $resource("/api/SalesDelivery/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());