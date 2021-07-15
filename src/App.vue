<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&family=Special+Elite&display=swap');

#app {
  /* font-family: 'Special Elite', monospace; */
  font-family: 'Courier Prime', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
</style>
