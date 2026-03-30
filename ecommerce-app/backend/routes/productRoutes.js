const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
    try {
        let query = {};

        // Filtering
        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.brand) {
            query.brand = req.query.brand;
        }

        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        if (req.query.rating) {
            query.rating = { $gte: Number(req.query.rating) };
        }

        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }

        let products = Product.find(query);

        // Sorting
        if (req.query.sort) {
            const sortField = req.query.sort;
            const sortOrder = req.query.order === 'desc' ? -1 : 1;
            products = products.sort({ [sortField]: sortOrder });
        } else {
            products = products.sort({ createdAt: -1 });
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = (page - 1) * limit;

        products = products.skip(startIndex).limit(limit);

        const total = await Product.countDocuments(query);
        const results = await products;

        res.json({
            products: results,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product (admin only - simplified for demo)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;