(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeLeaveApplication
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeLeaveApplicationResource",
        ["$resource",
        employeeLeaveApplicationResource]);

    function employeeLeaveApplicationResource($resource) {

        return $resource("/api/EmployeeLeaveApplication/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());