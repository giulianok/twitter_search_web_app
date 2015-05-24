app
.controller('HomeController', [ '$scope', 'SearchService', '$compile', function ($scope, SearchService, $compile) {

        $scope.search = function(q) {
            spawnSearch(q);
        };

        // **********************************************************
        // Private Methods
        // **********************************************************

        function spawnSearch(q) {
            SearchService.emit('q', q);
            $scope['tweets_' + q] = [];
            SearchService.on('tweet_' + q, function(tweet) {
                console.log(q, tweet);
                if ($scope['tweets_' + q].length == 10) {
                    $scope['tweets_' + q].shift();
                }
                $scope['tweets_' + q] = $scope['tweets_' + q].concat(tweet);

                $scope.twitts = $scope['tweets_' + q];

                //updateScope(q)
            });
        }

        function updateScope(q) {
            $scope.tweets = $scope['tweets_' + q];
            $scope.$apply();
        }

    }]);
