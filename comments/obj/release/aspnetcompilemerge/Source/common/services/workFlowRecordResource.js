     (function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: workFlowRecord
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("workFlowRecordResource",
        ["$resource",
        workFlowRecordResource]);

    function workFlowRecordResource($resource) {

        return $resource("/api/WorkFlowRecord/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());