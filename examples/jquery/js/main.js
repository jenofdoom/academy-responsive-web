$(document).ready(function() {

  var list = 'data.json';
  var displayMovies = function(movies) {
    var listContainer = $('<ul />');

    movies.forEach(function(movie) {
      var listItem = $('<li />');

      listItem.text(movie.name);
      listContainer.append(listItem);
    });

    $('.movie-container').append(listContainer);
  }

  $.getJSON(list)
  .done(function(data) {
    displayMovies(data.movies);
  })
  .fail(function(error) {
    console.log("Request Failed:", error);
  });   

});
