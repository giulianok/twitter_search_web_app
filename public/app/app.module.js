"use strict";

var app = angular.module('twitterSearchApp', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'btford.socket-io', 'ngToast']);

app
.config(['$locationProvider', '$compileProvider', 'ngToastProvider', function($locationProvider, $compileProvider, ngToastProvider) {
    // check if browser supports history API
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode({
            enabled : true,
            requireBase: false
        }).hashPrefix('!');
    }

    $compileProvider.debugInfoEnabled(true);

    ngToastProvider.configure({
        animation: 'slide'
    });
}]);
