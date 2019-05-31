<template>
  <div class="main-rating-wrap" ref="mainRating">
    <!-- 为了 better-scroll，顶层使用 absolute 撑开 -->
    <div class="rating-bscroll">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">
            {{seller.score}}
          </h1>
          <p class="text">综合评分</p>
          <p class="deco">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <p class="block about-server">
            <span class="text">服务态度</span>
            <sf-star class="star-wrap" :size="36" :score="seller.serviceScore"></sf-star>
            <span class="score">
              {{seller.serviceScore}}
            </span>
          </p>
          <p class="block about-food">
            <span class="text">商品评分</span>
            <sf-star class="star-wrap" :size="36" :score="seller.foodScore"></sf-star>
            <span class="score">
              {{seller.foodScore}}
            </span>
          </p>
          <p class="block about-time">
            <span class="text">送达时间</span>
            <span class="time">
              {{seller.deliveryTime}}分钟
            </span>
          </p>
        </div>
      </div>
      <common-split></common-split>
      <rating-select
        :rating-select="selectType"
        :only-content="onlyContent"
        :desc="desc"
        :ratings="ratings"
        :select-type="selectType"
        @change-only-content="changeOnlyContent"
        @change-select-type="changeSelectType"
      ></rating-select>
      <main-rating
        :rating-list="ratings"
      >

      </main-rating>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '@/components/common/star/star.vue';
import CommonSplit from '@/components/common/CommonSplit.vue';
import RatingSelect from '@/components/common/RatingSelect.vue';
import MainRating from '@/components/common/MainRating.vue';
const ALL = 2;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      ratings: []
    };
  },
  components: {
    SfStar: star,
    CommonSplit,
    RatingSelect,
    MainRating
  },
  async created () {
    const me = this;
    const url = '/api/ratings';
    const {data} = await me.axios.get(url);
    if (data.errorno) {
      return;
    }
    me.ratings = data.data;
    console.log('rating', me.ratings);
    console.log('seller', me.seller);
    this.$nextTick(() => {
      this.scroll = new BScroll(me.$refs.mainRating, {
        click: true
      });
    });
  },
  methods: {
    changeOnlyContent () {
      console.log('change-only-content');
      this.onlyContent = !this.onlyContent;
    },
    changeSelectType (type) {
      console.log('change-select-type');
      this.selectType = type;
    }
  }
};
</script>
<style lang="stylus" scoped>
  .main-rating-wrap
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .rating-bscroll
      .overview
        display flex
        padding 18px 0
        font-size 0
        .overview-left
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          padding 6px 0
          flex 0 0 137px
          .score
            font-size 24px
            line-height 28px
            color rgb(255, 153, 0)
            margin-bottom 6px
          .text
            margin-bottom 8px
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
          .deco
            font-size 10px
            line-height 10px
            color rgba(7, 17, 27, .5)
        .overview-right
          flex 1
          padding 6px 0 6px 24px
          .block
            margin-bottom 8px
            &:last-child
              margin-bottom 0
            .text
            .star-wrap
            .time
            .score
              display inline-block
              vertical-align top
            .text
              font-size 12px
              color rgb(7, 17, 27)
              line-height 18px
            .score
              font-size 12px
              color rgb(255, 153, 0)
              line-height 18px
            .time
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
              line-height 18px
            .star-wrap
              margin 0 12px
</style>
