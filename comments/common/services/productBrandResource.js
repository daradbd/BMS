(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productBrand
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productBrandResource",
        ["$resource",
        productBrandResource]);

    function productBrandResource($resource) {

        return $resource("/api/ProductBrand/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());