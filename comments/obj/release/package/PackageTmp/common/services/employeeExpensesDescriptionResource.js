(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeeExpensesDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeeExpensesDescriptionResource",
        ["$resource",
        employeeExpensesDescriptionResource]);

    function employeeExpensesDescriptionResource($resource) {

        return $resource("/api/EmployeeExpensesDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());