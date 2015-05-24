app
.directive('sidebar', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'app/shared/sidebar/sidebarView.html'
    }
});