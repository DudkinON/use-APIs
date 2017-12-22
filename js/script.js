(function () {
  var re = /[a-zA-Zа-яА-Я0-9]+/g;

  function prepareAddress(q) {
    var query = q.match(re);
    return query.join('+');
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