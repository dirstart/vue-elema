<template>
  <div class="wrap">
    <div
      class="food-decrease icon-remove_circle_outline"
      v-show="food.count > 0"
      @click="foodDecrease"
    ></div>
    <div class="food-num" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="food-add icon-add_circle" @click="foodAdd"></div>
  </div>
</template>

<script>
import Vue from 'vue';
// 给观测对象直接添加一个属性是不可以的，所以使用 Vue.set
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
  },
  data () {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    foodAdd (event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
        this.food.count = 1;
      } else {
        this.food.count++;
      }
    },
    foodDecrease (event) {
      if (!event._constructed) {
        return;
      }
      this.food.count--;
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  .wrap
    font-size 0  
  .food-decrease
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
    color #0898ee
  .food-num
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 12px
    color: rgb(147, 153, 159)
  .food-add
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
    color rgb(0, 160, 220)
  
</style>
