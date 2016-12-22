(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseOrderCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseOrderCategoryResource",
        ["$resource",
        purchaseOrderCategoryResource]);

    function purchaseOrderCategoryResource($resource) {

        return $resource("/api/PurchaseOrderCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());