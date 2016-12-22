angular.module('companyManagement', [])
  .service('AuthService', function () {
      var serviceInstance = {};
    this.isAuthenticated=function () {
          return false;

      }
      // Our first service
      return serviceInstance;
  });


//angular.module("companyManagement")
//  .run(function ($rootScope, $state, AuthService) {
//      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
//          //if (toState.authenticate && !AuthService.isAuthenticated()) {
//          //    // User isn’t authenticated
//          //    $state.transitionTo("comments");
//          //    event.preventDefault();
//          //}
//      });
//  });
