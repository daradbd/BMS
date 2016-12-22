(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: referenceTypeMapping
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("referenceTypeMappingResource",
        ["$resource",
        referenceTypeMappingResource]);

    function referenceTypeMappingResource($resource) {

        return $resource("/api/ReferenceTypeMapping/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());