(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salaryComponent
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salaryComponentsResource",
        ["$resource",
        salaryComponentsResource]);

    function salaryComponentsResource($resource) {

        return $resource("/api/SalaryComponents/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());