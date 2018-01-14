var app = new Vue({
  el: '.content',

  data: {
    movies: {},
    people: [],
    user: 1
  },

  created: function() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      var self = this;
      var list = 'data.json';
      var votes = 'data-votes.json';
      var people = 'data-people.json';

      fetch(list).then(function(response) {
        return response.json();
      }).then(function(json) {
        var movies = {}

        json.movies.forEach(function(movie){
          movie.votes = 0
          movies[movie.id] = movie
        });
        
        self.movies = movies;

        fetch(votes).then(function(voteResponse) {
          return voteResponse.json();
        }).then(function(voteJson) {
          voteJson.votes.forEach(function(vote) {
            var id = vote.movie.id;
            var movie = self.movies[id];

            Vue.set(movie, 'votes', movie.votes + 1);
          });
        });
      });

      fetch(people).then(function(peopleResponse) {
        return peopleResponse.json();
      }).then(function(peopleJson) {
        self.people = peopleJson.people;
      });
    },
    sendVote: function(id) {
      var self = this;
      var voteEndpoint = '/api/vote/';

      fetch(
        voteEndpoint + self.user + '/' + id,
        { method: 'POST'}
      ).then(function(response) {
        if (response.ok) {
          Vue.set(self.movies[id], 'votes', self.movies[id].votes + 1);
        } else {
          alert('You have already voted for this!');
        }
      });
    }
  }
});
