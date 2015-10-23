(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: department
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("departmentResource",
        ["$resource",
        departmentResource]);

    function departmentResource($resource) {

        return $resource("/api/Department/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());