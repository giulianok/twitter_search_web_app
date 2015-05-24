app
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: 'app/components/search/searchView.html',
            controller: 'HomeController as HC'
        });

    $urlRouterProvider.otherwise('/');
}]);
