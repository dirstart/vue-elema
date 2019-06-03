const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res, next) => {
    req.url = './index.html';
    next();
});
app.use(router);
const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

router.get('/api/seller', (req, res) => {
    res.json({
        errno: 0,
        data: seller
    });
});

router.get('/api/goods', (req, res) => {
    res.json({
        errno: 0,
        data: goods
    });
});

router.get('/api/ratings', (req, res) => {
    res.json({
        errno: 0,
        data: ratings
    });
});
app.use('/api', router);

app.use(express.static('./dist'));
app.listen(3000);