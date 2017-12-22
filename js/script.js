(function () {
  var re = /[a-zA-Zа-яА-Я0-9]+/g;
  var apiKey = 'ee4960d0070243fbbbb312c5e6ee3269';

  // Get value
  function getVal(elem) {
    return $(elem).val();
  }

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

    var street = getVal('#street');
    var city = getVal('#city');

    // define background image
    var img = $('#bgi');

    // Set background image
    img.attr('src', gMapUrl + street + city);
  }

  function showArticles() {
    var address = prepareAddress(street + ' ' + city);
  // Get articles
    getArticles(address, function(data) {
      console.log(data);
      var articles = data.response.docs;

      for (var i = 0; i < articles.length; i++) {
        var article = ''
      }
    });
  }

  $('#submit-btn').on('click', loadData);
})();