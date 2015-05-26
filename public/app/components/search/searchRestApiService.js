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
         *
         */
        var getTwitts = function(params){
            var deferred = $q.defer();

            $http.post('/twitter/search', params)
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        }

        var hostObject = {
            getSearches: function() {
                return getSearches();
            },
            saveSearchQuery: function(q){
                return saveSearchQuery(q);
            },
            getTwitts: function(q){
                return getTwitts(q);
            }
        };

        return hostObject;
}]);