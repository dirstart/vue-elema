<template>
  <div id="app">
    <div class="header">
      <sf-header></sf-header>
    </div>
    <ul class="tab border-1px">
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
import 'common/stylus/icon.css';

export default {
  name: 'app',
  components: {
    SfHeader: header
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "common/stylus/index.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(77, 27, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
