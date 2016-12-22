(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: collaborator
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("collaboratorResource",
        ["$resource",
        collaboratorResource]);

    function collaboratorResource($resource) {

        return $resource("/api/Collaborator/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());