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

#### 3.严重： sylus 无法引入 字体文件
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
