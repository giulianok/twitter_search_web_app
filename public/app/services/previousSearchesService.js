app.factory('PreviousSearchesService', ['$http', '$log', '$q', function($http, $log, $q) {

    /**
     *
     * @param params - { count: Int }
     * @returns {jQuery.promise|promise.promise|r.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
     */
    var getSearches = function ( params ) {
        var deferred = $q.defer();
        $http.post('/searches/list', params )
            .success(function(data) {
                deferred.resolve(data);
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
        return deferred.promise;
    };

    /**
     *
     * @param params - { query: 'String' }
     * @returns {jQuery.promise|promise.promise|r.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
     */
    var saveSearchQuery = function ( params ) {
        var deferred = $q.defer();

        $http.post('/searches/add', params)
            .success(function(data) {
                deferred.resolve(data);
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
        return deferred.promise;
    };

    // Gets more expressive power. Splitting all code into self-contained blocks just makes it easier.
    var hostObject = {
        getSearches: function( params ) {
            return getSearches( params );
        },
        saveSearchQuery: function(q){
            return saveSearchQuery(q);
        }
    };

    return hostObject;
}]);
