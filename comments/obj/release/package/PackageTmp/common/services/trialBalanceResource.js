(function () {
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: trialBalance
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("trialBalanceResource",
        ["$resource",
        trialBalanceResource]);

    function trialBalanceResource($resource) {

        return $resource("/api/TrialBalance/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());