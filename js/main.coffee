app = angular.module('OpenEpi', ['ui.bootstrap'])

app.config ['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/', {templateUrl: 'partials/modules.html', controller: 'ModulesController'})  
  $routeProvider.otherwise({redirectTo: '/'})
]

app.controller 'ModulesController', ['$rootScope', '$scope', '$location',
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