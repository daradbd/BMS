﻿(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseBillPayment
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseBillPaymentResource",
        ["$resource",
        purchaseBillPaymentResource]);

    function purchaseBillPaymentResource($resource) {

        return $resource("/api/PurchaseBillPayment/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());