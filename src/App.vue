<template>
  <div id="app" class="container-fluid h-100 p-0">
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from "./components/Home";
// import Settings from "./components/Settings";

export default {
  name: "App"
  // components: {
  //   Settings,
  //   Home
  // }
};
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  color: #ffffff;
}

.btn {
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 3px;
  margin-top: 3px;
}
</style>
