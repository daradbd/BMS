(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: employeesExpenses
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("employeesExpensesResource",
        ["$resource",
        employeesExpensesResource]);

    function employeesExpensesResource($resource) {

        return $resource("/api/EmployeesExpenses/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());