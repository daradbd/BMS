(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productCategoryResource",
        ["$resource",
        productCategoryResource]);

    function productCategoryResource($resource) {

        return $resource("/api/ProductCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());