(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: paymentMethod
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("paymentMethodResource",
        ["$resource",
        paymentMethodResource]);

    function paymentMethodResource($resource) {

        return $resource("/api/PaymentMethod/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());