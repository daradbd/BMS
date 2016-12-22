(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: moneyRequisition
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("moneyRequisitionResource",
        ["$resource",
        moneyRequisitionResource]);

    function moneyRequisitionResource($resource)
    {

        return $resource("/api/MoneyRequisition/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());