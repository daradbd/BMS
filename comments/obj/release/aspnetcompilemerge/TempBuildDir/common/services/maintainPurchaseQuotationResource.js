(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: maintainPurchaseQuotation
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("maintainPurchaseQuotationResource",
        ["$resource",
        maintainPurchaseQuotationResource]);

    function maintainPurchaseQuotationResource($resource) {

        return $resource("/api/MaintainPurchaseQuotation/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());