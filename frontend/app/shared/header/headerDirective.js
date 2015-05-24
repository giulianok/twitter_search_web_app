app
.directive('tsHeader', function () {
    return {
        restrict: 'AE',
        scope: {
            onSearch: '&'
        },
        replace: true,
        templateUrl: 'app/shared/header/headerView.html',
        link: function(scope, elm, attrs) {
            scope.callUpdate = function(searchString) {
                scope.onSearch()(searchString);
            }
        }
    }
});
