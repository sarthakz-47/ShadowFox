import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
        } else {
            setUser(JSON.parse(userInfo));
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            navigate('/');
        }
        setCartItems(cart);
    }, [navigate]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const placeOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                user: user._id,
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                totalPrice: calculateTotal(),
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', orderData);
            localStorage.removeItem('cart');
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h2>Checkout</h2>

                <div className="checkout-content">
                    <div className="checkout-form">
                        <div className="form-section">
                            <h3>Shipping Address</h3>
                            <input
                                type="text"
                                placeholder="Address"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                className="checkout-input"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className="checkout-input"
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className="checkout-input"
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                className="checkout-input"
                            />
                        </div>

                        <div className="form-section">
                            <h3>Payment Method</h3>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="checkout-select"
                            >
                                <option value="PayPal">PayPal</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash on Delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        <div className="form-section">
                            <h3>Order Items</h3>
                            {cartItems.map((item) => (
                                <div key={item.product} className="checkout-item">
                                    <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} />
                                    <div>
                                        <p>{item.name}</p>
                                        <p>${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="checkout-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-item">
                            <span>Items ({cartItems.length}):</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <div className="summary-item">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-total">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button
                            onClick={placeOrder}
                            className="place-order-btn"
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;