const { Router } = require('express');
const Product = require('../models/Product');

const router = Router();

// /api/product/add
router.post('/add', async (req, res) => {
  try {
    const { name, count, price, date_add } = req.body;

    const emptyField = !!name && !!count && !!price && !!date_add;

    if (!emptyField) {
      res.status(400).json({ message: 'Все поля должны быть заполнены' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Продукт успешно добавлен' });
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
    console.log(e);
  }
});


// /api/product
router.get('/', async (req, res) => {
  let product = [];
  const conf = req.query.hasOwnProperty('name') ? { name: new RegExp(req.query.name, 'i') } : {};
  try {
    product = await Product.find(conf);
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }

  const prdct = product.map(({ name, count, price, date_add, _id }) => {
    return { name, count, price, date_add, _id }
  })

  res.status(200).json(prdct);
});

// /api/product/
router.delete('/', async (req, res) => {
  try {
    const product = Product.find( { _id: { $in: req.body.data } } );
    await product.remove();
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
  res.status(200).json({ message: 'Запись(и) успешно удалена' });
});

router.patch('/:id', async (req, res) => {
  try {
   const body = req.body;
   await Product.update({_id: req.params.id}, {$set: body})
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
  res.status(200).json({ message: 'Поле успешно обновленно' });
});

module.exports = router;