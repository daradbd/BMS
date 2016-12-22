(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseDeliveryReceive
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseDeliveryReceiveResource",
        ["$resource",
        purchaseDeliveryReceiveResource]);

    function purchaseDeliveryReceiveResource($resource) {

        return $resource("/api/PurchaseDeliveryReceive/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());