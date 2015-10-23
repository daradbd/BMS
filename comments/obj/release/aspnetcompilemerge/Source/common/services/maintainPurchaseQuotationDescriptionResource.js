(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: maintainPurchaseQuotationDescription
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("maintainPurchaseQuotationDescriptionResource",
        ["$resource",
        maintainPurchaseQuotationDescriptionResource]);

    function maintainPurchaseQuotationDescriptionResource($resource) {

        return $resource("/api/MaintainPurchaseQuotationDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());