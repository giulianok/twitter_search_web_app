app
.directive('twit', function () {
    return {
        restrict: 'AE',
        scope: {
            twit: "="
        },
        replace: true,
        templateUrl: 'app/shared/twit/twitView.html',
        link: function(scope, elm, attrs) {

        }
    }
});