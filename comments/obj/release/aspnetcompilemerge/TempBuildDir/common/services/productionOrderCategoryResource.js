(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionOrderCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productionOrderCategoryResource",
        ["$resource",
        productionOrderCategoryResource]);

    function productionOrderCategoryResource($resource) {

        return $resource("/api/ProductionOrderCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());