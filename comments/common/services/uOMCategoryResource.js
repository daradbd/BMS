(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: uOMCategory
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("uOMCategoryResource",
        ["$resource",
        uOMCategoryResource]);

    function uOMCategoryResource($resource) {

        return $resource("/api/UOMCategory/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());