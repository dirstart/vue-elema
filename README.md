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