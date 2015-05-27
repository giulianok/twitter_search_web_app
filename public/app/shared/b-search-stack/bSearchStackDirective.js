app.directive('bSearchStack', ['PreviousSearchesService', 'ngToast', 'socket', '$timeout', function ( PreviousSearchesService, ngToast, socket, $timeout ) {
    return {
        restrict: 'AE',
        scope: {
            title: '@'
        },
        replace: true,
        templateUrl: 'app/shared/b-search-stack/b-search-stack.tpl.html',
        link: function(scope, elm, attrs) {

            scope.loading = true;

            var onLoad = function(collection){
                scope.loading = false;
                scope.collection = collection;
            }

            var onError = function(err){
                ngToast.create({
                    dismissButton: true,
                    className: 'danger',
                    content: '<strong>Error: </strong>' + err
                });
            }

            PreviousSearchesService.getSearches({ count: 10 }).then( onLoad, onError );

            // default title
            if(typeof scope.title == "undefined"){
                scope.title = "Search Stack:";
            }

            // listen for the keyword update on socket
            socket.on('search_key_update', function(data) {
                scope.collection.pop(); // pop the last one
                data.io = 'warning'; // class for highlight of a new one
                scope.collection.unshift(data); // push (unshift) to top
                $timeout(function(){ // after few seconds remove highlight class
                    data.io = 'default';
                }, 5000, true, data.io);
            })
        }
    }
}]);