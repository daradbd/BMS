(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salaryComponentConfig
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salaryComponentConfigResource",
        ["$resource",
        salaryComponentConfigResource]);

    function salaryComponentConfigResource($resource) {

        return $resource("/api/SalaryComponentConfig/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());