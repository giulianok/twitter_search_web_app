app.controller('SearchStreamApiController', [ '$scope', 'socket', 'ngToast', 'PreviousSearchesService', function ($scope, socket, ngToast, PreviousSearchesService) {

    $scope.title = 'Twitter Stream API Search';

    $scope.spawnSearch = spawnSearch;
    $scope.hideNav = true;
    $scope.showLoading = false;
    $scope.searchText = '';

    // on navigate from page kill last stream
    $scope.$on('$stateChangeStart', removeStream);

    // **********************************************************
    // Private Methods
    // **********************************************************

    /**
     * Init method, bootstrap the scope and starts the socket connection
     * @param q
     */
    function spawnSearch(q) {

        // show laoding
        $scope.showLoading = true;

        removeStream();

        // assign search text to scope
        $scope.searchText = q;

        // empty twitts if any
        if($scope.twitts && $scope.twitts.length > 0){
            $scope.twitts = [];
        }

        socket.emit('q', q);
        $scope['tweets_' + q] = [];
        socket.on('tweet_' + q, function(tweet) {
            //console.log(q, tweet);
            if ($scope['tweets_' + q].length == 10) {
                $scope['tweets_' + q].shift();
            }
            $scope['tweets_' + q] = $scope['tweets_' + q].concat(tweet);

            $scope.twitts = $scope['tweets_' + q];
        });

        // save search query
        PreviousSearchesService.saveSearchQuery({ query: q }).then(
            null,
            function(msg){
                ngToast.create({
                    dismissButton: true,
                    className: 'danger',
                    content: '<strong>Error: </strong>' + msg
                });
            }
        );
    }

    /**
     * remove stream for last search
     */
    function removeStream(){
        if($scope.searchText != ''){
            socket.emit('remove', $scope.searchText);
        }
    }

}]);
