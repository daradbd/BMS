(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: productionType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("productionTypeResource",
        ["$resource",
        productionTypeResource]);

    function productionTypeResource($resource) {

        return $resource("/api/ProductionType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());