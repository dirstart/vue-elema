<!--
    主要星星的分类可以用两个属性来控制。
    星星的内部颜色：  全星、半星、无星
    星星的大小： 24/36/48
    所以 starType - 大小、 itemClass - 颜色
-->
<template>
  <div class="star" :class="starType">
      <!-- <span v-for="item in itemClass">
      </span> -->
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {};
  },
  components: {},
  computed: {
    starType() {
      return 'star-' + this.size;
    }
  },
  mounted: {},
  methods: {}
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
</style>
