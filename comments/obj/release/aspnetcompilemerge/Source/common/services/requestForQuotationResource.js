(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: requestForQuotation
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("requestForQuotationResource",
        ["$resource",
        requestForQuotationResource]);

    function requestForQuotationResource($resource) {

        return $resource("/api/RequestForQuotation/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());