(function filters() {
    'use strict';

    angular.module('companyManagement').filter('isNull', function () {
    return function (input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '') {
            return defaultValue;
        }

        return input;
    }
});

})();