app
.controller('HomeController', [ '$scope', 'socket', 'SearchService', '$compile', function ($scope, socket, SearchService, $compile) {

        $scope.spawnSearch = spawnSearch;

        SearchService.getSearches().then( updateSearchList );

        // **********************************************************
        // Private Methods
        // **********************************************************

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

            SearchService.saveSearchQuery(q).then( addTOSearchList );
        }

        function updateScope(q) {
            $scope.tweets = $scope['tweets_' + q];
            $scope.$apply();
        }

        function updateSearchList(searchList) {
            //TODO Error Check
            $scope.searchlist =  searchList;
        };

        function addTOSearchList(searchItem) {
            //TODO Error Check
            $scope.searchlist.push(searchItem.data);
        };

    }]);
