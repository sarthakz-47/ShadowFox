import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        try {
            const cart = localStorage.getItem('cart');
            console.log('Raw cart data:', cart); // For debugging

            // Parse the cart data
            let parsedCart = [];
            if (cart) {
                parsedCart = JSON.parse(cart);
                // Make sure it's an array
                if (!Array.isArray(parsedCart)) {
                    console.error('Cart data is not an array:', parsedCart);
                    parsedCart = [];
                }
            }
            setCartItems(parsedCart);
        } catch (error) {
            console.error('Error loading cart:', error);
            setCartItems([]);
        }
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        const updatedCart = cartItems.map(item =>
            item.product === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.product !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const calculateTotal = () => {
        if (!cartItems || cartItems.length === 0) return '0.00';
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const checkout = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    // Add this check before rendering
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h2>Shopping Cart ({cartItems.length} items)</h2>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.product || item._id} className="cart-item">
                                <img
                                    src={item.image || 'https://via.placeholder.com/100'}
                                    alt={item.name || 'Product'}
                                />
                                <div className="item-details">
                                    <h3>{item.name || 'Product'}</h3>
                                    <p>${item.price ? item.price.toFixed(2) : '0.00'}</p>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => updateQuantity(item.product, item.quantity - 1)}>-</button>
                                    <span>{item.quantity || 1}</span>
                                    <button onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
                                </div>
                                <div className="item-total">
                                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                </div>
                                <button onClick={() => removeItem(item.product)} className="remove-btn">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-item">
                            <span>Subtotal ({cartItems.length} items):</span>
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
                        <button onClick={checkout} className="checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;