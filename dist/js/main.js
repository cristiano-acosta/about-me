'use strict';

// Format dates using plain JS
// Would be best to use http://momentjs.com/

Handlebars.registerHelper('dateFormat', function (options) {
	var date = new Date(options * 1000);
	var d = date.getDate();
	var m = date.getMonth() + 1; //Months are zero based
	var y = date.getFullYear();

	return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
});
//# sourceMappingURL=handlebars-helpers.js.map

'use strict';

$(function () {

  // Get your Behance API Key here:
  // https://www.behance.net/dev;

  //$.getJSON('behance_secret.json', function (json) {
  var beUsername = 'cristianoacosta',
      beApiKey = 'r9whGoGLGNqrkeCVY69NI3w6lj8qwjOb',
      bePerPage = 12,
      endpointUser = 'http://www.behance.net/v2/users/' + beUsername + '?callback=?&api_key=' + beApiKey,
      endpointProjects = 'http://www.behance.net/v2/users/' + beUsername + '/projects?callback=?&api_key=' + beApiKey + '&per_page=' + bePerPage;
  getBehanceData(endpointProjects, endpointUser);
  //});

  /**
   * Render User data
   */
  function setUserTemplate() {
    // Get handlebars template
    // And compile it (populate data)
    var userData = JSON.parse(sessionStorage.getItem('behanceUser')),
        getTemplate = $('#profile-template').html(),
        template = Handlebars.compile(getTemplate),
        result = template(userData);
    $('#header').html(result);
    $('#header .loading').remove();
  }

  /**
   * Render Portfolio data
   */
  function setPortfolioTemplate() {
    // Get handlebars template
    // And compile it (populate data)
    var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
        getTemplate = $('#portfolio-template').html(),
        template = Handlebars.compile(getTemplate),
        result = template(projectData);
    $('#portfolio').html(result);
    $('.wrapper').removeClass('loading');
  }

  /**
   * Get data
   */
  function getBehanceData(endpointProjects, endpointUser) {
    if (sessionStorage.getItem('behanceProject')) {
      setPortfolioTemplate();
    } else {
      // Load JSON-encoded data from the Behance API using a GET HTTP request.
      // Store it in sessionStorage
      $.getJSON(endpointProjects, function (project) {
        sessionStorage.setItem('behanceProject', JSON.stringify(project));
        setPortfolioTemplate();
      });
    }

    if (sessionStorage.getItem('behanceUser')) {
      setUserTemplate();
    } else {
      // Load JSON-encoded data from the Behance API using a GET HTTP request.
      // Store it in sessionStorage
      $.getJSON(endpointUser, function (user) {
        sessionStorage.setItem('behanceUser', JSON.stringify(user));
        setUserTemplate();
      });
    }
  }
});
//# sourceMappingURL=main.js.map
