<template>
  <div class="information">
    <nav class="information_navbar">
      <a href
         class="information_link"
         @click.prevent="$router.push({name:'home'})">回首頁｜</a>
    </nav>
    <main class="information_wrapper">
      <section class="information_wrapper">
        <h2 class="information_title">{{ '國家名稱' }}</h2>
        <p class="information_text">{{ '人數、詳細訊息' }}</p>
      </section>
    </main>
  </div>
</template>

<script>
  // component

  // mapGetter
  import { mapGetters } from 'vuex'

  export default {
    name: 'Information',
    components: {},
    created () {},
    computed: {
      ...mapGetters(['covid19SummaryGlobal', 'covid19SummaryCountries'])
    }
  }
</script>

<style lang="scss" scoped>
  .information {
    background-color: $theme-secondary;
    min-height: 100vh;
    font-size: 0;

    &_navbar {
      padding: 9px 12px;
      margin-bottom: 20px;
    }

    &_link {
      @include font(lighter, 12px, $font-secondary);
      display: inline-block;
      color: $font-dark;
      padding: 12px;
    }

    &_wrapper {
      max-width: 960px;
      padding: 0px 12px;
      margin: 0 auto;
    }

    &_title {
      @include font(bold, 16px, $font-secondary);
      color: $font-dark;
      padding-left: 12px;
      margin-bottom: 6px;
      svg {
        vertical-align: text-bottom;
        margin-left: 12px;
      }
    }

    &_text {
      @include font(lighter, 12px, $font-secondary);
      color: $font-dark;
      padding-left: 12px;
    }
  }
</style>>
