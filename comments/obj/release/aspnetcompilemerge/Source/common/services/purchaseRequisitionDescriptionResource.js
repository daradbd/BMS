(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseRequisitionDescription
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseRequisitionDescriptionResource",
        ["$resource",
        purchaseRequisitionDescriptionResource]);

    function purchaseRequisitionDescriptionResource($resource) {

        return $resource("/api/PurchaseRequisitionDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());