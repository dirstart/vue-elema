<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
      </div>
    </div>
    <div class="bullentin-wrap"></div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
</style>
