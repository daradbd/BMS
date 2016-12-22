(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeType
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeTypeResource",
        ["$resource",
        employeeTypeResource]);

    function employeeTypeResource($resource) {

        return $resource("/api/EmployeeType/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());