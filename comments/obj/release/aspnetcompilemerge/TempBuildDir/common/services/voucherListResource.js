(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: voucherList
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("voucherListResource",
        ["$resource",
        voucherListResource]);

    function voucherListResource($resource) {

        return $resource("/api/VoucherList/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());