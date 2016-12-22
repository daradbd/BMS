(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchasePermit
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchasePermitResource",
        ["$resource",
        purchasePermitResource]);

    function purchasePermitResource($resource) {

        return $resource("/api/PurchasePermit/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());