#### 初始配置

* 安装 stylus-loader/stylus
* config/index 中的 host 可能要改为 '0.0.0.0'  => 为了能够在手机上看到网页。
* static 静态资源加载，需要在 index.html 中添加 link
* stylus 和 less 的实现方式不同。
    * stylus `<style lang="stylus" ref="stylesheet/stylus></style`
    * less `<style lang="less" scoped></style>`
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



* * *


#### 可优化

* 1.代码的前后台交互中嵌套过多，可以优化  res.data.data => res.data 之类的。