(function () {
  var re = /[a-zA-Zа-яА-Я0-9]+/g;
  var apiKey = 'ee4960d0070243fbbbb312c5e6ee3269';

  function prepareAddress(q) {
    /**
     * Gets a string and creates a new line with "+" character between words
     * @param q - string
     * @type {Array|{index: number, input: string}|*}
     * @return string
     */
    var query = q.match(re);
    return query.join('+');
  }

  function getArticles(q, func) {
    /**
     * Async function get articles and use func to provide data
     * @param (q: string, func: function)
     * @type {string}
     */
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var link = url + 'api-key=' + apiKey + '&q=' + q;
    $.getJSON(link, func);
  }

  function loadData() {
    /**
     * On click form button, run functions
     */
    googleMapImage();
  }

  function googleMapImage() {
    /**
     * Generate url google map and set it as background
     * @type {string}
     */

      // Define Google map url
    var gMapUrl =
        'http://maps.googleapis.com/maps/api/streetview?size=1000x1000&location=';

    // define background image
    var img = $('#bgi');

    // Get street and city value
    var street = $('#street').val();
    var city = $('#city').val();

    // Set background image
    img.attr('src', gMapUrl + street + city);
  }

  $('#submit-btn').on('click', loadData);
})();