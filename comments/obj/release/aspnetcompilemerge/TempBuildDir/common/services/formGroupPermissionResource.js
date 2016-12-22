(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: formGroupPermission
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("formGroupPermissionResource",
        ["$resource",
        formGroupPermissionResource]);

    function formGroupPermissionResource($resource) {

        return $resource("/api/FormGroupPermission/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());