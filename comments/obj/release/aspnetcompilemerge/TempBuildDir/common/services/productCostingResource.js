(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productCosting
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productCostingResource",
        ["$resource",
        productCostingResource]);

    function productCostingResource($resource) {

        return $resource("/api/ProductCosting/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());