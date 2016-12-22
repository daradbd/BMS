(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: attachFile
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("attachFileResource",
        ["$resource",
        attachFileResource]);

    function attachFileResource($resource) {

        return $resource("/api/AttachFile/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());