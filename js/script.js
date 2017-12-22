(function () {
  var re = /[a-zA-Zа-яА-Я0-9]+/g;
  var apiKey = 'ee4960d0070243fbbbb312c5e6ee3269';

  // Get value
  function getVal(elem) {
    /**
     * Get input class or id and return the input value
     * @param elem - string
     * @return value - string
     */
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
    showArticles();
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
    var address = prepareAddress(getVal('#street') + ' ' + getVal('#city'));
  // Get articles
    getArticles(address, function(data) {
      console.log(data);
      var articles = data.response.docs;
      var card = '';
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var img = '';
        console.log(article.multimedia[0]);
        if (article.multimedia.length > 0) {
          img = article.multimedia[0].url;
        }
        card += '<div class="col-6 mb-4">\n' +
          '        <div class="card">\n' +
          '          <div class="image-box "\n' +
          '               style="background-image: url(' + '//www.nytimes.com/' + img + ')">\n' +
          '          </div>\n' +
          '          <div class="card-body">\n' +
          '            <h4 class="card-title">' + article.headline.main + '</h4>\n' +
          '            <p class="card-text">' + article.snippet + '</p>\n' +
          '            <a href="' + article.web_url + '" class="btn btn-primary" target="_blank">read</a>\n' +
          '          </div>\n' +
          '        </div>\n' +
          '      </div>\n\n';
      }
      $('#articles').html(card)
    });
  }

  $('#submit-btn').on('click', loadData);
})();