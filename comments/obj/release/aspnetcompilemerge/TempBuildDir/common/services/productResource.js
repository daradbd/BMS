(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: product
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productResource",
        ["$resource",
        productResource]);

    function productResource($resource) {

        return $resource("/api/Product/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());