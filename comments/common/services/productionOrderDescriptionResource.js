(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionOrderDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productionOrderDescriptionResource",
        ["$resource",
        productionOrderDescriptionResource]);

    function productionOrderDescriptionResource($resource) {

        return $resource("/api/ProductionOrderDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());