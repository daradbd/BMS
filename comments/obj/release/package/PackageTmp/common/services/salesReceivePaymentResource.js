(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesReceivePayment
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesReceivePaymentResource",
        ["$resource",
        salesReceivePaymentResource]);

    function salesReceivePaymentResource($resource) {

        return $resource("/api/SalesReceivePayment/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());