const express = require('express')
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator')
const auth = require('../../middleware/auth')

const Sale = require('../../models/Sale')
const User = require('../../models/User')

// @route  Post api/sales
// @desc   Create a sale listing
// @access Private
router.post('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')

        const newSale = new Sale({
            purchaseDate: req.body.purchaseDate,
            name: user.name,
            user: req.user.id,
            oppName: req.body.oppName,
            cost: req.body.cost,
            price: req.body.price,
            margin: req.body.margin,
            marginPercent: req.body.marginPercent,
            status: req.body.status
        })

        const sale = await newSale.save();

        res.json(sale)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

// @route  GET api/sales
// @desc   GET Current users sale
// @access Private

router.get('/', auth, async (req, res) => {
    try {
        const sales = await Sale.find({
            user: req.user.id
        }).sort({
            date: -1
        }).populate('user', ['name'])
        res.json(sales)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/sales/open
// @desc   GET only open sales
// @access Private

router.get('/open', auth, async (req, res) => {
    try {
        const sales = await Sale.find({
            status: false,
            user: req.user.id
        }).sort({
            date: -1
        }).populate('user', ['name'])
        res.json(sales)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/sales/closed
// @desc   GET only closed sales
// @access Private

router.get('/closed', auth, async (req, res) => {
    try {
        const sales = await Sale.find({
            status: true,
            user: req.user.id
        }).sort({
            date: -1
        }).populate('user', ['name'])
        res.json(sales)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/sales
// @desc   GET sale by id
// @access Private

router.get('/:id', auth, async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)

        if (!sale) {
            return res.status(404).json({
                msg: 'Sale not found'
            })
        }
        res.json(sale)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Sale not found'
            })
        }
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @route  DELETE api/sales/:id
// @desc   DELETE a sale listing
// @access Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)

        if (!sale) {
            return res.status(404).json({
                msg: 'Sale not found'
            })
        }

        // Check user
        if (sale.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized'
            })
        }
        await sale.remove();

        res.json({
            msg: 'Post removed'
        })
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Sale not found'
            })
        }
        res.status(500).send('Server Error')
    }
})




module.exports = router