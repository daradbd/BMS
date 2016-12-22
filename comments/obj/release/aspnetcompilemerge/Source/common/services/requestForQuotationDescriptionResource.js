(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: requestForQuotationDescription
     *  @date: 29/4/2015
     */

    angular
        .module("common.services")
        .factory("requestForQuotationDescriptionResource",
        ["$resource",
        requestForQuotationDescriptionResource]);

    function requestForQuotationDescriptionResource($resource) {

        return $resource("/api/RequestForQuotationDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());