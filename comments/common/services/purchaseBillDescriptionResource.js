﻿(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: purchaseBillDescription
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("purchaseBillDescriptionResource",
        ["$resource",
        purchaseBillDescriptionResource]);

    function purchaseBillDescriptionResource($resource)
    {

        return $resource("/api/PurchaseBillDescription/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());