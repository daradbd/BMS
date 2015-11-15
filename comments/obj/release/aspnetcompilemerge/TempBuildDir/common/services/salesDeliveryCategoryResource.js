(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesDeliveryCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesDeliveryCategoryResource",
        ["$resource",
        salesDeliveryCategoryResource]);

    function salesDeliveryCategoryResource($resource) {

        return $resource("/api/SalesDeliveryCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());