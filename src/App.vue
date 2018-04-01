<template>
  <div id="app">
    <div class="header">
      <sf-header></sf-header>
    </div>
    <ul class="tab">
      <router-link to="/goods" tag="li" class="tab-item">商品</router-link>
      <router-link to="/ratings" tag="li" class="tab-item">评价</router-link>
      <router-link to="/seller" tag="li" class="tab-item">商家</router-link>
    </ul>
    <div class="content">
      I'm content.
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header.vue';
export default {
  name: 'app',
  components: {
    SfHeader: header
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
</style>
