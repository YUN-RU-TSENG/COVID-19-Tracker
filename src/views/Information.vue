<template>
  <main class="information">
    <a href
       style="padding:24px; display:block"
       class="information_text"
       @click.prevent="$router.push({name:'home'})">上一頁｜此頁正在切</a>
    <section class="information_wrapper">
      <h2 class="information_title">新冠肺炎資訊</h2>
      <p class="information_text">由約翰霍普金斯所提供的訊息</p>
      <InformationCard />
    </section>
  </main>
</template>

<script>
  import InformationCard from '@/components/Information/InformationCard.vue';
  export default {
    components: {
      InformationCard
    },
    name: 'Information'
  };
</script>

<style lang="scss" scoped>
  .information {
    background-color: $theme-secondary;
    min-height: 100vh;
    font-size: 0;
    &_wrapper {
      max-width: 960px;
      padding: 0px 12px;
      margin: 0 auto;
      padding-top: 80px;
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
      margin-bottom: 12px;
    }
  }
</style>>