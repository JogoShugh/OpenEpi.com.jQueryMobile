define 'openEpi', ['angular'], ->
  openEpi = angular.module('openEpi', ['ui.bootstrap'])

  openEpi.config ['$routeProvider', ($routeProvider) ->
    $routeProvider.when('/', {templateUrl: 'partials/modules.html', controller: 'ModulesController'})
    $routeProvider.otherwise({redirectTo: '/'})
  ]

  openEpi.controller 'ModulesController', ['$rootScope', '$scope', '$location',
    ($rootScope, $scope, $location) ->
      $scope.modules = [
        name: 'Test 1'
        titleShort: 'Test 1 module'
      ,
        name: 'Test 2'
        titleShort: 'Test 2 module'
      ]

      $scope.moduleLoad = (moduleName) ->
        alert "Loading #{moduleName}"
  ]

  openEpi.exec = (moduleName, args) ->
    alert 'executing: ' + moduleName + " with: " + args
    '''
    module = @getModule moduleName
    callback = (result) =>
      console.log result
      if addToHistory
        @historyAdd module, result.model, result

    error = (err) ->
      console.log 'Error:'
      console.log err
    if not module?
      error "Could not find module named: #{moduleName}"
    return
    module.calculate args, callback, error
    '''
  return openEpi



