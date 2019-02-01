#### 初始配置

* 安装 stylus-loader/stylus
* config/index 中的 host 可能要改为 '0.0.0.0'  => 为了能够在手机上看到网页。
* static 静态资源加载，需要在 index.html 中添加 link
* 利用 vue-cli 搭建的后台需要在:  webpack.dev.conf.js 中的 devServer 中写
不知道 express 从哪里被引用了，神奇。
```
  devServer: {
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: seller
        });
      });
    },
    clientLogLevel: 'warning',
  ...
```
* 同时为了我们的后台能够被看见，不能使用 vue-cli webpack 默认的 启动路径
这个拿不到数据：`http://localhost:8080/#/api/seller`
下面这个可以： `http://localhost:8080/api/seller`

### 问题未解决！

#### 1.左侧分类栏点击 => 触发右边滚动 => 触发 currentIndex 变化 => 到第 4/5 的时候 currentIndex 出错。
> 已解决，问题源于 better-scoll 1px 的计算偏差。 第五个tab的边界值为1757，而better-scroll计算为1756

解决方案： 在 currentIndex 的判断处 `+1px`.(未找到计算偏差原因，经测试不是 border 问题)

* * *

### 踩坑实录

#### 1.关于 localhost:8080/#/ 和 localhost:8080 的区别
> 因为 vue-cli 默认的带 #，导致我在 webpack.dev.conf.js 中写的 路由无效了。 

https://segmentfault.com/q/1010000010340823
https://www.imooc.com/qadetail/229672?lastmedia=1

#### 2.配置路径别名的方法
```      
'common': resolve('src/common')
'common': path.resolve(__dirname, '../src/common')
```

#### 3.严重： stylus 无法引入 字体文件
原引用方式(失败的方式，修改原来的 css 为 styl 文件)：猜测可能是 webpack 中 stylus 需要相关配置？  --------------  `style` 下引用
```
<style lang="stylus" ref="stylesheet/stylus">
  @import "common/stylus/index.styl"
  @import "common/stylus/icon.styl"
```
现引用方案：使用原来默认的 .css 文件  ------- `script` 下引用。
```
<script>
import header from '@/components/header/header.vue';
import 'common/stylus/test.css';
```
## 短期内无法解决该问题：https://segmentfault.com/q/1010000009500736
## 留待有空解决。暂时采用 css 方案。

#### 4.移动端实现 1px 的办法
通过 @media 查询参数来实现。通过 after 来实现 border，此后通过 查询，分别给 after 添加 transform 缩放来实现。我们可以通过添加背景来检验是否真的变化。(因为1px的变动很难用肉眼观测到)
```
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)
  .border-1px
    &::after
      -webkit-transform: scaleY(0.7)
      transform: scaleY(0.7)

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
  .border-1px
    &::after
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
      background-color: red
```

#### 5.keepAlive 的学习和使用
> 今天学习了下这个 组件缓存 的功能。简单地来说，可以使用在 input 的信息保留上。

* 普通组件的 信息保留。 ----   当 v-if 切换的时候，通过注释的地方可以保留信息。
```
  <div>
    <!-- <keep-alive include="test-keep-alive"> -->
      <test-keep-alive v-if="bool"></test-keep-alive>
    <!-- </keep-alive> -->
    <button @click="handleBool">test</button>
  </div>
```
* 更为酷炫的是： 路由里面的缓存保留。 -- 目测应该常用于 登录注册。 (很关键的功能)
```
{
  path: '/goods',
  name: 'goods',
  component: Goods,
  meta: {
    keepAlive: true
  }
},
------------------------
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
这两个是 if 是为了 所有组件的呈现。如果没有第二个，说明你不想 无法缓存的组件出现了.


#### 6.配置修改出现了一个问题
> host: '0.0.0.0', // can be overwritten by process.env.HOST

本意是希望能够也在手机端浏览。造成的麻烦是每次都默认打开了  0.0.0.0 页面报错，还需要手动置回  localhost 才能对，花费了一次时间。

当前解决方案： 先配置回去 `host: process.env.HOST`
此后若是需要手机调试，其实也可以：  npm run dev


#### 7.`git checkout -`  (gay特踹克奥特杠)切换到上一条分支！！！ 太好用了！ 跟 Sublime 的`Ctrl + Tab` 异曲同工。记住了！！！


#### 8.关于`display: block` 和`display: inline-block`的区别。
> 使用 `display: block` 会出现子层父层边距合并的问题。即是说，父层无`margin-top`，子层有，则父层也会有`margin-top`，采用 `display: inlne-block` 因为其 BFC 特性则 => 子层相对于父层产生边距，父层对外无边距。

![](https://raw.githubusercontent.com/dirstart/image_bed/167278625cc7f85935eca2d326411b4ed5fba172/inline-block%E5%92%8Cblock1.png)

![](https://raw.githubusercontent.com/dirstart/image_bed/167278625cc7f85935eca2d326411b4ed5fba172/inline-block%E5%92%8Cblock2.png)

![](https://raw.githubusercontent.com/dirstart/image_bed/167278625cc7f85935eca2d326411b4ed5fba172/inline-block%E5%92%8Cblock3.png)

![](https://raw.githubusercontent.com/dirstart/image_bed/167278625cc7f85935eca2d326411b4ed5fba172/inline-block%E5%92%8Cblock4.png)

#### 9.Chrome调试，若要获取拥有某一个类名的元素。
> $$('[htmlTag].[className]')，例如：  `$$('div.content-wrap')`

#### 10.`v-if`和`v-show`选择哪一个

* `v-if`是惰性的，初始条件为 false，则直接不渲染。同时它的改变意味着 DOM 元素的销毁。=> reflow 回流。
> 切换的时候开销较大。因此切换的时候使用 v-show.
* `v-show`代表着该 DOM 元素是渲染的。改变的只是元素的 `display` 属性.
> 如果较少切换，只在第一次运行的时候使用到，可以用 v-if.

#### 11.解决`css-loader`对图片静态资源的绝对路径 url方式 引用的办法 -- 修改 vue-cli 中 webpack 的配置
```
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: options.sourceMap,
    root: path.resolve(__dirname, '../static'),
    url: true,
    alias: {
      '@': path.resolve(__dirname, '../static')
    },
    import: false,
    modules: false,
    minimize: true,
    sourceMap: true,
    camelCase: false,
  }
}
```
#### 12.关于 src 方式的引入

```
<img src="~common/xxx.jpg" alt="" width="100px" height="100px">
<img :src="params" alt="">
```
* 前者采用 ~common 的alias方法引入 ！！！！！！！！！！！
* 后者应该用 线上的地址。 否则怎么搞都是错的！！！！！！！！！

#### 13.渐变效果学习
```
transition all 0.5s
&.fade-enter-active, &.fade-leave-active
  transition: all 0.5s
&.fade-enter, &.fade-leave-active
  opacity: 0
  background: rgba(7, 17, 27, 0)
```

#### 14.除了设置固定高度以外如何让 overflow: hiden/sroll 生效？
通过设置 绝对定位 和 top 和 right
```
position: absolute;
top: 174px;
bottom: 37px;
```

#### 15.`background-size: container` 和 `background-size: cover` 的区别
> 作用原理基本相同。都是将图片缩放以适应整个容器的宽高。(图片的宽高比没有改变)

* no-repeat 的情况下
    - cover 铺满容器，多出的部分被裁掉 => 委曲求全          => 成全
    - contain 容器内至少有一张完整的图 => 拼尽全力，全身而进 => 强扭的瓜
* repeat 的情况下
    - cover 与上述相同
    - contain 平铺。(想起 XP 时代的桌面背景了吗。。简直就是儿时的回忆)

* * *

#### 16.关于 better-scroll 这个组件
> 实际上当使用这个组件之后，系统默认的 onClick 就会被屏蔽掉.

#### 17.如何给观测对象添加属性
> 直接给观测对象，如组件中被传入 props，添加属性，是不可以的。
受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
解决方案是使用： Vue.set(this.obj, 'attrName', 1);

#### 18.vue-cli中使用的webpack-dev-server里面有漏洞。
> 执行 npm audit fix 之后，再将 webpack-dev-server 降级为 @3.0.0


#### 可优化

#### 1.代码的前后台交互中嵌套过多，可以优化  res.data.data => res.data 之类的。

#### ~~2.关于星星的部分，考虑以前我看过的一个教程。通过一张 上中下 - 有星、半星、无星 的图来实现。  改变的只是其位置~~
#### 2.直接用十颗星作为一张整图，通过移动整图来实现。
#### 2PS.采用单个的 全星、半星、无星 的好处是可以应对多种情况.

#### 3.关于for循环添加同样的一个对象到一个数组里面。
> 是否有更快捷的办法。不使用 for 循环？

