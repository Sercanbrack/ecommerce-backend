const router = require('express').Router();
const { Category, Product, } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'product_category' }]
    })

    if (!categoryData) {
      res.status(404).json({message: 'No category found with this id!'})
      return;
    }

    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = Category.findByPk(req.params.id)
    const body = req.body
    const index = categoryData.indexOf(categoryData)

    if(!categoryData) {
      res.status(404).json({message: 'No category found with this id!'})
      return
    } else {
      const updatedCategory = {...categoryData, ...body }
      categoryData[index] = updatedCategory;
      res.status(200).json(updatedCategory)
    }
    } catch(err) {
      res.status(400).json(err)
    }
});

router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!categoryData) {
      res.status(404).json({message: 'No category found with this id!'})
      return
    }

    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
