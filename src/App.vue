<template>
  <div id="app">
    <div class="header">
      <!-- I'm header. -->
      <sf-header></sf-header>
    </div>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      I'm content.
    </div>
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
      .tab-item
        flex: 1
</style>
