app.factory('SearchRestApiService', ['$http', '$log', '$q', function($http, $log, $q) {

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
            getTwitts: function(params){
                return getTwitts(params);
            }
        };

        return hostObject;
    }]);