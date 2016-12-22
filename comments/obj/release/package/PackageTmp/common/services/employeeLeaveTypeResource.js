(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeLeaveType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeLeaveTypeResource",
        ["$resource",
        employeeLeaveTypeResource]);

    function employeeLeaveTypeResource($resource) {

        return $resource("/api/EmployeeLeaveType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());