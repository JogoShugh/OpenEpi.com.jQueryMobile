define 'openEpi', ['modules', 'angular', 'angular-twitter-bootstrap'], (modules) ->
  openEpi = angular.module('openEpi', ['ui.bootstrap'])

  openEpi.config ['$routeProvider', ($routeProvider) ->
    $routeProvider.when('/', {templateUrl: 'partials/modules.html', controller: 'ModulesController'})
    $routeProvider.when('/module/:moduleName', {templateUrl: 'partials/module.html', controller: 'ModuleController'})
    $routeProvider.otherwise({redirectTo: '/'})
  ]

  openEpi.controller 'ModulesController', ['$rootScope', '$scope', '$location',
    ($rootScope, $scope, $location) ->
      $scope.modules = modules
      $scope.moduleLoad = (moduleName) ->
        $location.path '/module/' + moduleName
      $scope.moduleMatches = (module, filterTerm) ->
        return true if not filterTerm?
        return true if module.title.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
        for tag in module.tags
          return true if tag.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
        return false
      $scope.detailsTitle = (detailsShown) ->
        return "More Info" if not detailsShown
        return "Less Info"
  ]

  openEpi.controller 'ModuleController', ['$rootScope', '$scope', '$routeParams', '$location',
    ($rootScope, $scope, $routeParams, $location) ->
      module = getModule $routeParams.moduleName
      $scope.module = module
      $scope.hasResult = false
      $scope.result = {
        resultPaneActive: false
      }
      makeInputModel $scope, module

      callback = (result) ->
        console.log module
        module.renderData result, (data) ->
          $scope.hasResult = true
          $scope.result = data
          $scope.result.resultPaneActive = true


      $scope.calculate = ->
        module.calculate module.model, callback, onError

      $scope.clear = ->
        clearInputModel $scope, module
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

  makeInputModel = ($scope, module) ->
    delete module.model if module.model?
    model = {}
    for key in module.inputFields
      model[key] = ''
    module.model = model

    window.openEpi.model = model
    window.openEpi.model.set = (name, value) ->
      module.model[name] = value
      $scope.$digest()

  clearInputModel = ($scope, module) ->
    makeInputModel $scope, module
    #for key in module.inputFields
    #  module.model[key] = ''

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

  angular.bootstrap document, ['openEpi']

  return openEpi



