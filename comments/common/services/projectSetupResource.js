(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: projectSetup
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("projectSetupResource",
        ["$resource",
        projectSetupResource]);

    function projectSetupResource($resource) {

        return $resource("/api/ProjectSetup/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());