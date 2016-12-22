(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productSpecification
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productSpecificationResource",
        ["$resource",
        productSpecificationResource]);

    function productSpecificationResource($resource) {

        return $resource("/api/ProductSpecification/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());