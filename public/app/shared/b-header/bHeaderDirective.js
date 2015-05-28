app
    .directive('bHeader', function () {
        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            templateUrl: 'app/shared/b-header/b-header.tpl.html'
        }
    });