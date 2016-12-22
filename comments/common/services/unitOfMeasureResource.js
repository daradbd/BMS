(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: unitOfMeasure
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("unitOfMeasureResource",
        ["$resource",
        unitOfMeasureResource]);

    function unitOfMeasureResource($resource) {

        return $resource("/api/UnitOfMeasure/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());