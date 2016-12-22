(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: formList
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("formListResource",
        ["$resource",
        formListResource]);

    function formListResource($resource) {

        return $resource("/api/FormList/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());