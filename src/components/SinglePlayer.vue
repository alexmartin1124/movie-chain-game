<template>
  <div class="container">
    <div class="row">
      <img class="logo" src="/static/images/logo.png">
    </div>
    <div class="row">
      <div id="scoreboard" class="panel panel-default">
        <h2>Current Score:</h2>
        <h1>{{images.length}}</h1>
      </div>
    </div>
    <div v-if="start">
    <div class="row">
      <h1 class="text">Enter a movie below:</h1>
    </div>
    <div class="row">
      <input v-model="movieLink" type="text" class="form-control" v-on:keyup.enter="submitFirstMovie()"></input>
    </div>
  </div>
    <div v-else-if="movie">
    <div class="row">
      <h1 class="text">Now enter a movie starring that actor:</h1>
    </div>
    <div class="row">
      <input v-model="movieLink" type="text" class="form-control" v-on:keyup.enter="submitMovie()"></input>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <h1 class="text">Now enter an actor in that movie:</h1>
    </div>
    <div class="row">
      <input v-model="actorLink" type="text" class="form-control" v-on:keyup.enter="submitActor()"></input>
    </div>
  </div>
  <div class="alert alert-danger wrong-answer" v-if="error">
    {{error}}
  </div>
  <!-- <carousel>
    <slide v-for="(image, index) in images" :key="index">
      <img :src="image">
    </slide>
  </carousel> -->
  <div v-for="image in images">
    <img :src="image">
  </div>
  </div>
</template>

<script>

export default {
  name: 'SinglePlayer',
  data () {
    return {
      start: true,
      movie: false,
      movieLink: '',
      movieID: '',
      actorLink: '',
      actorID: '',
      images: [],
      error: ''
    }
  },
  methods: {
    submitFirstMovie () {
      var self = this
      self.error = false
      var link = self.movieLink.split(' ').join('+')
      var key = process.env.TMBD_API_KEY
      var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + key + '&query=' + link
      self.axios.get(url).then(function (response) {
        if (response.data.results.length === 0) {
          self.error = 'Sorry! That movie does not appear to exist. Try again.'
          self.movieLink = ''
        } else {
          var movie = response.data.results[0]
          self.movieID = movie.id
          var image = 'https://image.tmdb.org/t/p/w154/' + movie.poster_path
          self.images.push(image)
          self.start = false
        }
      })
    },
    submitActor () {
      let self = this
      var key = process.env.TMBD_API_KEY
      var url = 'https://api.themoviedb.org/3/movie/' + self.movieID + '/casts?api_key=' + key
      self.axios.get(url).then((response) => {
        var cast = response.data.cast
        var found = false
        for (var i = 0; i < cast.length; i++) {
          var actor = cast[i]
          if (actor.name === self.actorLink) {
            self.actorID = actor.id
            var image = 'https://image.tmdb.org/t/p/w154/' + actor.profile_path
            self.images.push(image)
            self.movieLink = ''
            self.movie = true
            found = true
          }
        }
        if (!found) {
          self.error = 'Sorry! Wrong answer. Start again!'
          self.start = true
          self.images = []
        }
      })
    },
    submitMovie () {
      var self = this
      var key = process.env.TMBD_API_KEY
      var url = 'https://api.themoviedb.org/3/person/' + self.actorID + '?api_key=' + key + '&append_to_response=credits'
      self.axios.get(url).then(function (response) {
        var credits = response.data.credits.cast
        var found = false
        for (var i = 0; i < credits.length; i++) {
          var movie = credits[i]
          if (movie.original_title === self.movieLink || movie.title === self.movieLink) {
            self.movieID = movie.id
            var image = 'https://image.tmdb.org/t/p/w154/' + movie.poster_path
            self.images.push(image)
            self.actorLink = ''
            self.movie = false
            found = true
          }
        }
        if (!found) {
          self.error = 'Sorry! Wrong answer. Start again!'
          self.start = true
          self.images = []
        }
      })
    }
  }
}
</script>

<style scoped>
  input {
    width: 50%;
    margin: 0 auto;
    font-size: 200%;
    text-align: center;
  }
  #scoreboard {
    float: right;
    background-color: white;
    color: black;
  }
  .wrong-answer {

  }
</style>
