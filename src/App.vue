<template>
  <div id="app">
    <div class="header">
      <sf-header :seller="seller"></sf-header>
    </div>
    <ul class="tab border-1px">
      <router-link to="/goods" tag="li" class="tab-item">商品</router-link>
      <router-link to="/ratings" tag="li" class="tab-item">评价</router-link>
      <router-link to="/seller" tag="li" class="tab-item">商家</router-link>
    </ul>
    <!-- keep-alive 的原理，将组件的状态缓存到内存里，切换router的时候，router从内存中读取  -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header.vue';
import 'common/stylus/icon.css';
export default {
  name: 'app',
  components: {
    SfHeader: header
  },
  // 定义成函数的原因其实是 闭包！ 如果定义成对象复用就容易产生冲突而且不安全
  data () {
    return {
      seller: {}
    };
  },
  async created () {
    const me = this;
    const res = await me.axios.get('/api/seller');
    // 这里可以加上 if res.data.errno === 0
    me.seller = res.data.data || {};
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
