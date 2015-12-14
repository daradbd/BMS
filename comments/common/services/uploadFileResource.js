(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: uploadFile
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("uploadFileResource",
        ["$resource",
        uploadFileResource]);

    function uploadFileResource($resource) {

        return $resource("/api/UploadFile/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());