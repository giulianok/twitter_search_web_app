app.filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) {
                var phrases = phrase.trim().replace(/\s\s+/g, ' ').split(" ");
                for (var i = 0; i < phrases.length; i++) {
                    text = text.replace(new RegExp('(' + phrases[i] + ')', 'gi'), '<span class="highlighted">$1</span>');
                }
            }

            return $sce.trustAsHtml(text)
        }
    });