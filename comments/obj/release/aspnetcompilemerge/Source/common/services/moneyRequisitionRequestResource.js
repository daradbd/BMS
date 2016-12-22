﻿(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: moneyRequisitionRequest
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("moneyRequisitionRequestResource",
        ["$resource",
        moneyRequisitionRequestResource]);

    function moneyRequisitionRequestResource($resource)
    {

        return $resource("/api/MoneyRequisitionRequest/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());