<template>
  <div id="app"
       class="app">
    <!-- <section>
      <router-link to="/baseCard">baseCard </router-link>
      <router-link to="/baseItem">| baseItem </router-link>
      <router-link to="/baseNavbar">| baseNavbar </router-link>
      <router-link to="/baseSideBar">| baseSideBar </router-link>
      <router-link to="/baseSortbar">| baseSortbar </router-link>
    </section> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {

      };
    }
  };
</script>

<style lang="scss">
  #app #nprogress .bar {
      background: red !important;
    }
</style>
