(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productCostingDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productCostingDescriptionResource",
        ["$resource",
        productCostingDescriptionResource]);

    function productCostingDescriptionResource($resource) {

        return $resource("/api/ProductCostingDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());