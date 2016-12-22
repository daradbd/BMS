(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salesBill
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salesBillResource",
        ["$resource",
        salesBillResource]);

    function salesBillResource($resource) {

        return $resource("/api/SalesBill/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());