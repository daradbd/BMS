(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeDetails
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeDetailsResource",
        ["$resource",
        employeeDetailsResource]);

    function employeeDetailsResource($resource) {

        return $resource("/api/EmployeeDetails/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());