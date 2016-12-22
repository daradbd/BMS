(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseDeliveryReceiveDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseDeliveryReceiveDescriptionResource",
        ["$resource",
        purchaseDeliveryReceiveDescriptionResource]);

    function purchaseDeliveryReceiveDescriptionResource($resource) {

        return $resource("/api/PurchaseDeliveryReceiveDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());