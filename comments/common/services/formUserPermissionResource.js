(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: formUserPermission
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("formUserPermissionResource",
        ["$resource",
        formUserPermissionResource]);

    function formUserPermissionResource($resource) {

        return $resource("/api/FormUserPermission/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());