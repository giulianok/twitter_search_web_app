app.filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) {
                phrase = phrase.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); //escape special characters
                phrase = phrase.trim();                                         //trim whitespaces from start and end of the string
                phrase = phrase.replace(/\s+/g, '|');                           //replace spaces with |
                text = text.replace(new RegExp('(^|\\W)('+ phrase +')(?=\\W|$)', 'gi'), '$1<span class="highlighted">$2</span>');
            }

            return $sce.trustAsHtml(text)
        }
    });