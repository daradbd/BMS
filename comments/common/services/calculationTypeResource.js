(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: calculationType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("calculationTypesResource",
        ["$resource",
        calculationTypesResource]);

    function calculationTypesResource($resource) {

        return $resource("/api/CalculationTypes/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());