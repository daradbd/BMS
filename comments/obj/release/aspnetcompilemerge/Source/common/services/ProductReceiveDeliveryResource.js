(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productReceiveDelivery
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productReceiveDeliveryResource",
        ["$resource",
        productReceiveDeliveryResource]);

    function productReceiveDeliveryResource($resource) {

        return $resource("/api/ProductReceiveDelivery/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());