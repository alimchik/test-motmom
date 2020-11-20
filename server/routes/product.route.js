const { Router } = require('express');
const Product = require('../models/Product');

const router = Router();

// /api/product/add
router.post('/add', async (req, res) => {
  try {
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

// /api/product/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
  res.status(200).json({ message: 'Запись успешно удалена' });
});

router.patch('/:id', async (req, res) => {
  try {
   const body = req.body;
   await Product.update({_id: req.params.id}, {$set: body})
  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
  res.status(200).json({ message: 'Поле учпешно обновленно' });
});

module.exports = router;