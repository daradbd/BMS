(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: gLedger
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("gLedgerResource",
        ["$resource",
        gLedgerResource]);

    function gLedgerResource($resource) {

        return $resource("/api/GLedger/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());