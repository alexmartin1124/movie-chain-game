<template>
  <div class="container">
    <div class="row">
      <img class="logo" src="/static/images/logo.png">
    </div>
    <div class="row">
      <h1 class="text">Welcome to the Movie Chain Game!</h1>
    </div>
    <br>
    <br>
    <br>
    <div class="row">
      <button class="btn btn-lg" data-toggle="collapse" data-target="#rules">Rules</button>
    </div>
    <div class="row">
      <div id="rules" class="collapse">
        <h2 class="text">The object of the game is to extend the chain for as long as possible. You'll start with a movie. You must then name an actor in that movie. From there, you'll name another movie starring that actor, and so on.</h2>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div class="row">
      <button class="btn btn-lg btn-launch-game" @click="goToSinglePlayer()">Single Player</button> <button class="btn btn-lg btn-launch-game" @click="goToMultiplayer()">Multiplayer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToSinglePlayer () {
      this.$router.push('/single')
    },
    goToMultiplayer () {
      alert('Page not set up yet.')
    }
  }
}
</script>

<style scoped>
  .btn-launch-game {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
