(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: workFlowConfig
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("workFlowConfigResource",
        ["$resource",
        workFlowConfigResource]);

    function workFlowConfigResource($resource) {

        return $resource("/api/WorkFlowConfig/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());