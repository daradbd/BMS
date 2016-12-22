(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: fiscalYear
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("fiscalYearResource",
        ["$resource",
        fiscalYearResource]);

    function fiscalYearResource($resource) {

        return $resource("/api/FiscalYear/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());