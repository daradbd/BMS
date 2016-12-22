(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: salaryComponentDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("salaryComponentDescriptionResource",
        ["$resource",
        salaryComponentDescriptionResource]);

    function salaryComponentDescriptionResource($resource) {

        return $resource("/api/SalaryComponentDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());