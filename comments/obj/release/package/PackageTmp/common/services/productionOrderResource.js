(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionOrder
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productionOrderResource",
        ["$resource",
        productionOrderResource]);

    function productionOrderResource($resource) {

        return $resource("/api/ProductionOrder/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());