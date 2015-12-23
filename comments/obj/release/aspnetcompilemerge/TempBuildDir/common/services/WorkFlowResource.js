(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: workFlow
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("workFlowResource",
        ["$resource",
        workFlowResource]);

    function workFlowResource($resource) {

        return $resource("/api/WorkFlow/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());