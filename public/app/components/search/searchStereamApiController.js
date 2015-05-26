app
.controller('SearchStreamApiController', [ '$scope', 'socket', 'SearchStreamApiService', function ($scope, socket, SearchService) {

    $scope.spawnSearch = spawnSearch;

    $scope.title = 'Twitter Stream API Search';

    SearchService.getSearches().then( updateSearchList );

    // **********************************************************
    // Private Methods
    // **********************************************************

    /**
     *
     * @param q
     */
    function spawnSearch(q) {
        socket.emit('q', q);
        $scope['tweets_' + q] = [];
        socket.on('tweet_' + q, function(tweet) {
            console.log(q, tweet);
            if ($scope['tweets_' + q].length == 10) {
                $scope['tweets_' + q].shift();
            }
            $scope['tweets_' + q] = $scope['tweets_' + q].concat(tweet);

            $scope.twitts = $scope['tweets_' + q];

            //updateScope(q)
        });

        SearchService.saveSearchQuery(q).then( addToSearchList );
    }

    function updateScope(q) {
        $scope.tweets = $scope['tweets_' + q];
        $scope.$apply();
    }

    function updateSearchList(searchList) {
        //TODO Error Check
        $scope.searchlist =  searchList;
    };

    function addToSearchList(searchItem) {
        //TODO Error Check
        $scope.searchlist.unshift(searchItem.data);
    };

}]);
