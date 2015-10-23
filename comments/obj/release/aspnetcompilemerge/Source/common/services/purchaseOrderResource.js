(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrder
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseOrderResource",
        ["$resource",
        purchaseOrderResource]);

    function purchaseOrderResource($resource) {

        return $resource("/api/PurchaseOrder/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());