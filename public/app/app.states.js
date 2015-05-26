app
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeController as HC'
        })
        .state('rest', {
            url: '/rest',
            templateUrl: 'app/components/search/searchView.html',
            controller: 'SearchRestApiController as SRAC'
        })
        .state('stream', {
            url: '/stream',
            templateUrl: 'app/components/search/searchView.html',
            controller: 'SearchStreamApiController as SSAC'
        });

    $urlRouterProvider.otherwise('/');
}]);
