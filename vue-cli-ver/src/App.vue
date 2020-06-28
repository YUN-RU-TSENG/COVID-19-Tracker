<template>
  <div id="app"
       class="app">
    <section>
      <router-link to="/baseCard">baseCard </router-link>
      <router-link to="/baseItem">| baseItem </router-link>
      <router-link to="/baseNavbar">| baseNavbar </router-link>
      <router-link to="/baseSideBar">| baseSideBar </router-link>
      <router-link to="/baseSortbar">| baseSortbar </router-link>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('API_COVID_19_Summary');
      this.$store.dispatch('API_COVID_19_Countries');
    },
    data: function() {
      return {
        
      };
    }
  };
</script>

<style lang="scss">
  .app {
    min-height: 100vh;
    background-color: $theme-secondary;
    padding: 20px;
    > section:first-of-type {
      margin-bottom: 24px;
    }
    > section > a {
      font-family: $font-primary;
      font-size: 12px;
      font-weight: 100;
    }
  }
</style>
