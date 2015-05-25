app
.directive('bSearch', function () {
    return {
        restrict: 'AE',
        scope: {
            onSubmit: '&'
        },
        replace: true,
        templateUrl: 'app/shared/b-search/bSearchView.html',
        link: function(scope, elm, attrs) {
            scope.submit = function(searchString) {
                scope.onSubmit()(searchString);
            }
        }
    }
});
