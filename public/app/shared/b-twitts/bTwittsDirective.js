app
.directive('bTwitts', function () {
    return {
        restrict: 'EA',
        scope: {
            collection: "=",
            searchText: "=hightlight"
        },
        replace: true,
        templateUrl: 'app/shared/b-twitts/b-twitts.tpl.html'
    }
});