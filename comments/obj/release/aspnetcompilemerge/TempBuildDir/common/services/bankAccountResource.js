﻿(function ()
{
    "use strict";

    /**
     *  @Module Name (Service)
     *  @Factory Name (Resource)
     *  @dependence ($resource)
     *  @author  name: Md. Rejwanul Reaz
     *  @project name: BMS
     *  @resource name: bankAccount
     *  @date: 9/4/2015
     */

    angular
        .module("common.services")
        .factory("bankAccountResource",
        ["$resource",
        bankAccountResource]);

    function bankAccountResource($resource)
    {

        return $resource("/api/BankAccount/:ID", { 'ID': '@_ID' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        }
            );
    }
}());