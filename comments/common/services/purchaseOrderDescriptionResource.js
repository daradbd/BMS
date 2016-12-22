(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrderDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseOrderDescriptionResource",
        ["$resource",
        purchaseOrderDescriptionResource]);

    function purchaseOrderDescriptionResource($resource) {

        return $resource("/api/PurchaseOrderDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());