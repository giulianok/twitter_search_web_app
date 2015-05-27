app
.factory('SearchRestApiService', ['$http', '$log', '$q', function($http, $log, $q) {

        // TODO create a base service
        var getSearches = function () {
            var deferred = $q.defer();
            $http.get('/searches/list')
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        };

        var saveSearchQuery = function (q) {
            var deferred = $q.defer();

            var newSearchQuery  = {
                'query': q
            }

            $http.post('/searches/add', newSearchQuery)
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        };

        /**
         * Ask server for the twitts with the given parameters.
         * @param params
         * @returns {jQuery.promise|promise.promise|r.promise|promise|jQuery.ready.promise|qFactory.Deferred.promise|*}
         */
        var getTwitts = function(params){
            var deferred = $q.defer();

            $http.post('/twitter/search', params)
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function(err, code) {
                    deferred.reject(err);
                    $log.error(err.message, err.code);
                });
            return deferred.promise;
        }

        // Gets more expressive power. Splitting all code into self-contained blocks just makes it easier.
        var hostObject = {
            getSearches: function() {
                return getSearches();
            },
            saveSearchQuery: function(q){
                return saveSearchQuery(q);
            },
            getTwitts: function(params){
                return getTwitts(params);
            }
        };

        return hostObject;
}]);