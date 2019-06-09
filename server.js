let express = require('express');
let app = express();
let router = express.Router();
// 模拟数据
const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;
// 定义相关的路由地址
router.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});

router.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});

router.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});
// 以该文件夹地址为服务器根目录
app.use(express.static('./dist'));
// 第一个字符串是前缀 API
app.use('/api', router);
app.listen(3000);
