app
    .directive('bPager', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                loading: '=',
                hide: '=',
                lastPage: '='
            },
            templateUrl: 'app/shared/b-pager/b-pager.tpl.html',
            link: function(scope, elm, attrs, ngModel) {
                ngModel.$viewChangeListeners.push(function() {
                    scope.$eval(attrs.ngChange);
                });
                ngModel.$render = function() {
                    scope.currentPage = ngModel.$modelValue;
                };
                scope.next = function() {
                    if(!scope.noNext()) {
                        scope.currentPage++;
                        ngModel.$setViewValue(scope.currentPage);
                    }
                };
                scope.prev = function() {
                   if(!scope.noPrevious()) {
                        scope.currentPage--;
                        ngModel.$setViewValue(scope.currentPage);
                   }
                };
                scope.noNext = function() {
                    // TODO find out how to indicate that there is no next page
                    return ( scope.hide || scope.loading || scope.lastPage )? true : false;
                };
                scope.noPrevious = function() {
                    return ( scope.hide || scope.loading || scope.currentPage <= 1 ) ? true : false;
                };
            }
        }
    });