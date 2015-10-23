(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseRequisition
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseRequisitionResource",
        ["$resource",
        purchaseRequisitionResource]);

    function purchaseRequisitionResource($resource) {

        return $resource("/api/PurchaseRequisition/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());