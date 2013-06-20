define 'openEpi', ['modules', 'angular', 'angular-twitter-bootstrap'], (modules) ->
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

  onError = (message) ->
    console.log 'Error: '
    console.log message

  getModule = (moduleName) ->
    module = modules[moduleName]
    if not module?
      onError "Could not find module #{moduleName}"
      return null
    return module

  console.log modules

  '''
    getModuleModel: (module) ->
      moduleModel = @moduleModels[module.name]
      if not moduleModel?
        moduleModel = Backbone.Model.extend(schema: module.inputFields)
        @moduleModels[module.name] = moduleModel
    return moduleModel
  '''

  openEpi.exec = (moduleName, args) ->
    module = getModule moduleName
    callback = (result) ->
      console.log 'Result: '
      console.dir result
    if not module?
      onError "Could not find module named: #{moduleName}"
      return
    console.log 'calculating:' + module
    module.calculate args, callback, onError

  return openEpi



