(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: ledgerSheet
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("ledgerSheetResource",
        ["$resource",
        ledgerSheetResource]);

    function ledgerSheetResource($resource) {

        return $resource("/api/LedgerSheet/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());