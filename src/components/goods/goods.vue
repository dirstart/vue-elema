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
              <span v-show="item.type > 0" class="item-icon" :class="classMap[item.type]">
              </span>
              {{item.name}}
              <!-- <span class="item-text">{{item.name}}</span> -->
            </div>
        </li>
      </ul>
    </div>
    <div class="content">sdd</div>
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
  display flex
  .sidebar
    flex 0 0 80px
    width 80px
    color #093
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
        background #eee
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
    color #089e8a
</style>
