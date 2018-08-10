<template>
  <div class="goods-wrap">
    <div class="sidebar">
      <ul class="menu-list">
        <li v-for="(item,index) in goods"
          :key="index"
          :class="{'current': currentIndex === index}"
          class="menu-item"
          @click="menuItemClick">
            <div class="item-info border-1px">
              <span v-show="item.type > 0" class="item-icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </div>
        </li>
      </ul>
    </div>
    <div class="content">
      <ul class="cat-list">
        <li v-for="(item, index) in goods" :key="index" class="cat-item">
          <h1 class="food-title">{{item.name}}</h1>
          <ul class="food-list">
            <li v-for="(food, index) in item.foods" :key="index" class="food-item">
              <div class="food-icon-wrap">
                <img :src="food.icon || ''" alt="" class="food-icon">
              </div>
              <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.desc}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span class="">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    const me = this;
    me.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    const url = '/api/goods';
    const {data} = await me.axios.get(url);
    if (data.errno) {
      return;
    }
    me.goods = data.data;
    console.log('goods', me.goods);
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      classMap: []
    };
  },
  methods: {
    menuItemClick () {
      console.log('click');
    }
  },
  computed: {
    currentIndex () {
      // 厉害了，这个当前高亮的会根据滚动条的来判断，应该不简单.
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        // 以后再写这个
        console.log(h1);
      }
      return 3;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"

.goods-wrap
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .sidebar
    flex 0 0 80px
    width 80px
    background: #f3f5f7
    .menu-item
      display table
      width 56px
      height 54px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        margin-top -1px
        z-index 10
        background #fff
        font-weight 700
      .item-info
        display: table-cell
        width 56px
        vertical-align middle
        font-size 12px
        border-1px(rgba(7, 17, 27, .1))
        .item-icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('./img/decrease_3')
          &.discount
            bg-image('./img/discount_3')
          &.special
            bg-image('./img/special_3')
          &.invoice
            bg-image('./img/invoice_3')
          &.guarantee
            bg-image('./img/guarantee_3')
  .content
    flex 1
    .cat-list
    .cat-item
      .food-title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #45c178
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-list
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            margin-bottom 0
            border-none()
          .food-icon-wrap
            flex 0 0 57px
            margin-right 10px
            img
              width 57px
              height 57px
              background-size cover
          .food-content
            flex 1
            .name
              margin 2px 0 8px 0
              height 14px
              font-size 14px
              color #07111b
            .desc
              margin-bottom 8px
              line-height 20px
              color rgb(147, 153, 169)
              font-size 10px
            .extra
              color #333
              line-height 10px
              .count
                margin-right 12px

</style>
