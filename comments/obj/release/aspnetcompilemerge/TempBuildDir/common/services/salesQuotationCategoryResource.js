(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesQuotationCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesQuotationCategoryResource",
        ["$resource",
        salesQuotationCategoryResource]);

    function salesQuotationCategoryResource($resource) {

        return $resource("/api/SalesQuotationCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());