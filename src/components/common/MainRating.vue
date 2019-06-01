<template>
  <ul class="rate-wrapper">
    <li v-for="(item, index) in ratingList"
      :key="index"
      class="rate-item"
    >
      <div class="avatar">
        <img :src="item.avatar" width="28px" height="28px" alt="">
      </div>
      <div class="content">
        <p class="user-name">
          {{item.username}}
        </p>
        <span class="user-time">
          {{item.rateTime | stampToTime}}
        </span>
        <!-- 用户评分 -->
        <div class="star-wrapper">
          <sf-star :size="24" :score="item.score"></sf-star>
        </div>
        <p class="user-comment">
          {{item.text}}
        </p>
        <div class="tag-wrapper" v-show="item.rateType === 0 && item.recommend && item.recommend.length">
          <i class="tag-thumb icon-thumb_up"></i>
          <span class="tag-item" v-for="(tagItem, tagIndex) in item.recommend" :key="tagIndex">
            {{tagItem}}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import star from '@/components/common/star/star.vue';
import {formatDate} from '@/components/common/js/date.js';

export default {
  props: {
    ratingList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {};
  },
  components: {
    SfStar: star
  },
  computed: {},
  mounted() {},
  methods: {},
  filters: {
    stampToTime (val) {
      return formatDate(new Date(val), 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
  @import "../../common/stylus/mixin.styl"
  .rate-wrapper
    margin 0 18px
    .rate-item
      display flex
      padding 18px 0
      border-1px(rgba(7, 17, 27, .1))
      .avatar
        flex 0 0 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .user-name
          font-size 10px
          color rgb(7, 17, 27)
          line-height 12px
        .user-time
          position absolute
          top 0
          right 0
          font-size 10px
          font-weight 200
          color rgb(147, 153, 159)
          line-height 12px
        .star-wrapper
          margin 4px 0 6px 0
        .user-comment
          margin-bottom 8px
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
        .tag-wrapper
          .tag-thumb
            color rgb(0, 160, 220)
            font-size 9px
            line-height 16px
          .tag-item
            margin 0 8px 3px 0
            display inline-block
            padding 0 6px
            font-size 10px
            color rgb(147, 153, 159)
            height 16px
            line-height 16px
            border 1px rgba(7, 17, 27, .1) solid
            border-radius 2px
            background-color rgb(255, 255, 255)
</style>
