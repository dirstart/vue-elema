<template>
  <ul class="rating-list">
    <li v-for="(item, index) in ratingList"
      :key="index"
      class="rating-item"
      v-show="judgeShow(item)"
    >
      <div class="rating-about">
        <time class="rating-time">
          {{item.rateTime | stampToTime}}
        </time>
        <p class="rating-user">
          <span class="user-name">
            {{item.username}}
          </span>
          <img class="user-icon" :src="item.avatar" alt="">
        </p>
      </div>
      <div class="rating-content">
        <i class="content-icon">
          <i class="icon-thumb_up" v-if="!item.rateType"></i>
          <i class="icon-thumb_down" v-else></i>
        </i>
        <span class="content-text">
          {{item.text}}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import {formatDate} from '@/components/common/js/date.js';
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratingList: {
      type: Array,
      default () {
        return [];
      }
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    selectType: {
      type: Number,
      default: ALL
    }
  },
  data () {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    judgeShow (item) {
      let flag = true;
      // 只看有内容的评价
      if (this.onlyContent && !item.text) {
        flag = false;
      }
      // 筛选掉 当前/推荐/吐槽
      if (item.rateType !== this.selectType && this.selectType !== ALL) {
        flag = false;
      }
      return flag;
    }
  },
  filters: {
    stampToTime: time => {
      return formatDate(new Date(time), 'yyyy-MM-dd hh:mm');
    }
  },
  watch: {
    ratingList (val) {
      console.log('watch', val);
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  .rating-list
    padding 10px 18px
    .rating-item
      padding 5px 0 10px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .rating-about
        position relative
        height 12px
        font-size 0
        margin-bottom 8px
        .rating-time
          font-size 10px
          line-height 12px
          height 12px
          color #93999f
        .rating-user
          position absolute
          height 12px
          right 0
          top 0
          .user-name
            display inline-block
            margin-right 8px
            height 12px
            line-height 12px
            font-size 10px
            color #93999f
            vertical-align top
          .user-icon
            display inline-block
            width 12px
            height 12px
      .rating-content
        .content-icon
          font-size 12px
          .icon-thumb_up
            color rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
        .content-text
          font-size 12px
          height 16px
          line-height 16px
</style>
