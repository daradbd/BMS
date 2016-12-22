(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeLeaveGroup
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeLeaveGroupResource",
        ["$resource",
        employeeLeaveGroupResource]);

    function employeeLeaveGroupResource($resource) {

        return $resource("/api/EmployeeLeaveGroup/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());