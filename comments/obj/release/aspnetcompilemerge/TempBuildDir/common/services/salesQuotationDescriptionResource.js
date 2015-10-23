(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesQuotationDescription
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("salesQuotationDescriptionResource",
        ["$resource",
        salesQuotationDescriptionResource]);

    function salesQuotationDescriptionResource($resource) {

        return $resource("/api/SalesQuotationDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());