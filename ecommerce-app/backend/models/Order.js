const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: String,
        status: String,
        updateTime: String,
        emailAddress: String,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);