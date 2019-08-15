$(function () {

  // Get your Behance API Key here:
  // https://www.behance.net/dev;

  //$.getJSON('behance_secret.json', function (json) {
  var beUsername = 'cristianoacosta';
  var beApiKey = 'r9whGoGLGNqrkeCVY69NI3w6lj8qwjOb';
  var bePerPage = 12;
  var endpointUser = 'http://www.behance.net/v2/users/' + beUsername + '?callback=?&api_key=' + beApiKey;
  var endpointProjects = 'http://www.behance.net/v2/users/' + beUsername + '/projects?callback=?&api_key=' + beApiKey + '&per_page=' + bePerPage;
  getBehanceData(endpointProjects, endpointUser);
  //});

  /** * Render User data */
  function setUserTemplate() {
    // Get handlebars template
    // And compile it (populate data)
    var userData = JSON.parse(sessionStorage.getItem('behanceUser'));
    var getTemplate = $('#profile-template').html();
    var template = Handlebars.compile(getTemplate);
    var result = template(userData);
    $('#about').html(result);
    $('#about .loading-img').remove();
  }

  /** * Render Portfolio data */
  function setPortfolioTemplate() {
    // Get handlebars template
    // And compile it (populate data)
    var projectData = JSON.parse(sessionStorage.getItem('behanceProject'));
    var getTemplate = $('#portfolio-template').html();
    var template = Handlebars.compile(getTemplate);
    var result = template(projectData);
    $('#portfolio').html(result);
    $('.wrapper').removeClass('loading');
  }

  /*** Get data */
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

  /** * Linkedin Profile Data */
  var linkedinUserName = 'cristianoacosta';
  var linkedinProfilePage = 'https://www.linkedin.com/in/'+linkedinUserName;
  console.log(linkedinProfilePage);
  $.getJSON(linkedinProfilePage, function (profile) {
    sessionStorage.setItem('linkedinProfilePage', JSON.stringify(profile));
    console.log(profile);
  });

});
