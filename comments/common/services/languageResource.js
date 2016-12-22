(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("languageResource",
        ["$resource",
        languageResource]);

    function languageResource($resource) {

        return $resource("/api/Language/:ID", { 'ID': '@_ID' }, {
                    update: {
                        method: 'PUT' // this method issues a PUT request
                    }
                }
            );
        }
}());