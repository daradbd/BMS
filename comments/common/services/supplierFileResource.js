(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: supplierFile
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("supplierFileResource",
        ["$resource",
        supplierFileResource]);

    function supplierFileResource($resource) {

        return $resource("/api/SupplierFile/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
      );
    }
}());