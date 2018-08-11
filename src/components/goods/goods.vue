<template>
  <div class="goods-wrap">
    <div class="sidebar" ref="sidebarEl">
      <ul class="menu-list">
        <li v-for="(item,index) in goods"
          ref="menuList"
          :key="index"
          class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="_selectCat(index, $event)">
            <div class="item-info border-1px">
              <span v-show="item.type > 0" class="item-icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </div>
        </li>
      </ul>
    </div>
    <div class="content" ref="contentEl">
      <ul class="cat-list">
        <li v-for="(item, index) in goods"
          :key="index"
          class="cat-item"
          ref="catList"
        >
          <h1 class="food-title">{{item.name}}</h1>
          <ul class="food-list">
            <li v-for="(food, index) in item.foods"
              :key="index"
              class="food-item"
            >
              <div class="food-icon-wrap">
                <img :src="food.icon || ''" alt="" class="food-icon">
              </div>
              <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.desc}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span @click="console.log(12)">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
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
import BScroll from 'better-scroll';

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
    me.$nextTick(() => {
      me._initScroll();
      me._calculateHeight();
    });
  },
  data () {
    return {
      goods: [],
      // 为了实现 better-scroll联动的效果=>需要计算每个 cat-list 的高度
      catHeight: [],
      classMap: [],
      scrollY: 0,
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.catHeight.length; i++) {
        let h1 = this.catHeight[i];
        let h2 = this.catHeight[i + 1];
        // 计算出当前的右侧高度在哪个区间
        if (!h2 || (this.scrollY + 1 >= h1 && this.scrollY + 1 < h2)) {
          // 这里还要确定是 右侧用户手动触发的 还是 通过左侧影响触发的
          console.log('这里是多少', i, this.scrollY);
          console.log('高度区间', this.catHeight);
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    _initScroll () {
      this.sidebarScroll = new BScroll(this.$refs.sidebarEl, {
        click: true
      });
      this.contentScroll = new BScroll(this.$refs.contentEl, {
        probeType: 3,
        click: true
      });

      this.contentScroll.on('scroll', (pos) => {
        this.scrollY = pos.y <= 0 ? Math.abs(Math.round(pos.y)) : pos;
      });
    },
    // 根据右侧菜单的滚动 => 高亮左侧分类按钮
    _calculateHeight () {
      const me = this;
      let height = 0;
      let catList = me.$refs.catList;

      me.catHeight.push(height);
      for (let i = 0; i < catList.length; i++) {
        height += catList[i].clientHeight;
        me.catHeight.push(height);
      }
    },
    // 通过选择左侧分类按钮 => 滚动右侧菜单
    _selectCat (index, event) {
      if (!event._constructed) {
        return;
      }
      let scrollEl = this.$refs.catList[index];
      this.contentScroll.scrollToElement(scrollEl, 1000);
    },
    _followScroll (index) {
      let scrollEl = this.$refs.menuList[index];
      this.sidebarScroll.scrollToElement(scrollEl, 300, 0, -100);
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
              line-height 10px
              font-size 10px
              color #93999f
              .count
                margin-right 12px
            .price
              line-height 24px
              font-size 14px
              .now
                margin-right 8px
                color #f01414
              .old
                font-size 10px
                text-decoration line-through
                color: rgb(147, 153, 159)

</style>
