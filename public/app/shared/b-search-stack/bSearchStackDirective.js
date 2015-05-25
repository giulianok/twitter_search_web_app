app
.directive('bSearchStack', ['$timeout', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            collection: '='
        },
        replace: true,
        templateUrl: 'app/shared/b-search-stack/bSearchStackView.html',
        link: function(scope, elm, attrs) {
            scope.currentPage = 1;//current page
            scope.maxSize = 5;//pagination max size
            scope.entryLimit = 5;//max rows for data table
            scope.noOfPages = 0;

            scope.$watch('collection', function(newval, oldval){
                if(newval){
                    scope.noOfPages = Math.ceil(scope.collection.length / scope.entryLimit);
                }
            });

            scope.setPage = function (pageNo) {
                scope.currentPage = pageNo;
            };


            scope.$watch('search', function(term) {
                scope.filter = function() {
                    scope.noOfPages = Math.ceil(scope.filtered.length/scope.entryLimit);
                }
            });
        }
    }
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});