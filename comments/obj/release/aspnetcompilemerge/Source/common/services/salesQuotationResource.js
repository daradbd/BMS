(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesQuotation
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("salesQuotationResource",
        ["$resource",
        salesQuotationResource]);

    function salesQuotationResource($resource) {

        return $resource("/api/SalesQuotation/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());