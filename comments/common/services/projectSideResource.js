(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: projectSide
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("projectSideResource",
        ["$resource",
        projectSideResource]);

    function projectSideResource($resource) {

        return $resource("/api/ProjectSide/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());