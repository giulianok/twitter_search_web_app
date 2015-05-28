app.controller('SearchRestApiController', [ '$scope', 'SearchRestApiService', 'ngToast', 'PreviousSearchesService',  function ($scope, SearchRestApiService, ngToast, PreviousSearchesService) {

        var count = 20; //max twitts per page

        $scope.title = 'Twitter REST API Search';

        $scope.spawnSearch = init;
        $scope.pageChanged = pageChanged;
        $scope.hideNav = true;
        $scope.lastPage = false;
        $scope.showLoading = false;
        $scope.history = [];
        $scope.searchText = '';


        // **********************************************************
        // Private Methods
        // **********************************************************
        /**
         * Init method, bootstrap the scope
         * @param q
         */
        function init(q) {
            // show laoding
            $scope.showLoading = true;

            // hide nav
            $scope.hideNav = true;

            // empty twitts if any
            if($scope.twitts && $scope.twitts.length > 0){
                $scope.twitts = [];
            }

            // reset metadata
            if(typeof $scope.searchMetadata != "undefined"){
                $scope.searchMetadata = {};
            }

            // assign search text to scope
            $scope.searchText = q;

            // create params
            var params = {
                'q': q,
                'count': count
            }

            // get twitts with params
            SearchRestApiService.getTwitts( params ).then( firstPage, errorHandler );

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
         * When new search is performed this method is called to reset all data
         * @param response
         */
        function firstPage(response){

            renderTwitts(response);

            // check if there is more than one page
            if(hasOwnProperty($scope.searchMetadata, 'next_results')){
                $scope.hideNav = false;
            }
            else{
                $scope.hideNav = true;
            }

            // reset pageing
            $scope.currentPage = $scope.oldPage = 1;
        }

        /**
         * Callback method for pager directive. This method is invoked when buttons 'Newer' or 'Older' are clicked.
         */
        function pageChanged(){

            $scope.showLoading = true;

            if($scope.currentPage > $scope.oldPage){
                var params = urlParamsToObject( $scope.searchMetadata.next_results );
                SearchRestApiService.getTwitts( params ).then( renderTwitts, errorHandler );

                $scope.history.push($scope.searchMetadata.max_id_str);

                $scope.oldPage = $scope.currentPage;
            }
            else if($scope.currentPage < $scope.oldPage){
                var params = {
                    count: count,
                    include_entities: "1",
                    max_id: $scope.history.pop(),
                    q: $scope.searchText,
                };

                SearchRestApiService.getTwitts( params ).then( renderTwitts, errorHandler );

                $scope.oldPage = $scope.currentPage;
            }
        }

        /**
         * Assign new collection of twitts to scope
         * @param response - twitts collection
         */
        function renderTwitts(response){
            // hide loader
            $scope.showLoading = false;

            $scope.searchMetadata = response.search_metadata;
            $scope.twitts = response.statuses;

            // logic for the last page (disable Older Button)
            if($scope.hideNav == false){
                if(!hasOwnProperty($scope.searchMetadata, 'next_results')){
                    $scope.lastPage = true;
                }
                else if($scope.lastPage){
                    $scope.lastPage = false;
                }
            }
        }

        /**
         * Toast the error message.
         * @param err
         */
        function errorHandler(err){
            // hide loader
            $scope.showLoading = false;

            ngToast.create({
                dismissButton: true,
                className: 'danger',
                content: '<strong>Error: </strong>' + err.message + ' <strong>Code: </strong>' + err.code
            });
        }

        /**
         * Check if given object has a property.
         * @param obj
         * @param prop
         * @returns {boolean}
         */
        function hasOwnProperty(obj, prop) {
            var proto = obj.__proto__ || obj.constructor.prototype;
            return (prop in obj) &&
                (!(prop in proto) || proto[prop] !== obj[prop]);
        }

        /**
         * Convert string containing HTTP GET variables into object
         * @param getParams
         * @returns {*}
         */
        function urlParamsToObject(urlParams){
            // remove '?' character from bigining of the string
            if (urlParams.substring(0, 1) == '?') {
                urlParams = urlParams.substring(1);
            }

            // replace the '&' with ',' and '=' with ':'
            urlParams = urlParams.replace(/&/g, '","').replace(/=/g, '":"');

            // assemble the JSON string and parse it to object
            return JSON.parse(
                '{"' + urlParams + '"}',
                function(key, value) {
                    return (key === "")? value : decodeURIComponent(value) ;
                }
            );
        }
    }]);