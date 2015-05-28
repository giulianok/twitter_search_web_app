app
.directive('bSearch', function () {
    return {
        restrict: 'AE',
        scope: {
            onSubmit: '&'
        },
        replace: true,
        templateUrl: 'app/shared/b-search/b-search.tpl.html',
        link: function(scope, elm, attrs) {
            scope.submit = function(searchString) {
                scope.onSubmit()(searchString);
            }
        }
    }
});
