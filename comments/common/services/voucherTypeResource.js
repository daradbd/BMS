(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: voucherType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("voucherTypeResource",
        ["$resource",
        voucherTypeResource]);

    function voucherTypeResource($resource) {

        return $resource("/api/VoucherType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());