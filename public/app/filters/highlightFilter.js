app.filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) {
                phrase = phrase.trim().replace(/\s+/g, '|');
                text = text.replace(new RegExp('(^|\\W)('+ phrase +')(?=\\W|$)', 'gi'), '$1<span class="highlighted">$2</span>');
            }

            return $sce.trustAsHtml(text)
        }
    });