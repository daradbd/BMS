(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: supplierType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("supplierTypeResource",
        ["$resource",
        supplierTypeResource]);

    function supplierTypeResource($resource) {

        return $resource("/api/SupplierType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());