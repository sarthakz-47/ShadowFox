import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
        setLoading(false);
    };

    const addToCart = () => {
        try {
            // Get existing cart or create empty array
            let cart = localStorage.getItem('cart');
            let cartArray = [];

            if (cart) {
                cartArray = JSON.parse(cart);
                // Ensure it's an array
                if (!Array.isArray(cartArray)) {
                    cartArray = [];
                }
            }

            // Check if product already exists in cart
            const existingItemIndex = cartArray.findIndex(item => item.product === id);

            if (existingItemIndex !== -1) {
                // Update quantity if product exists
                cartArray[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                cartArray.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                });
            }

            // Save back to localStorage
            localStorage.setItem('cart', JSON.stringify(cartArray));
            alert('Added to cart!');
            console.log('Cart updated:', cartArray); // For debugging
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
        }
    };

    const buyNow = () => {
        addToCart();
        navigate('/cart');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-gallery">
                    <img src={product.image || 'https://via.placeholder.com/500'} alt={product.name} />
                </div>

                <div className="product-details">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-brand-detail">Brand: {product.brand}</p>
                    <div className="product-rating-detail">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span>({product.rating} out of 5)</span>
                    </div>
                    <p className="product-price-detail">${product.price}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="quantity-input"
                            />
                            <span className="stock-info">{product.stock} items available</span>
                        </div>

                        <div className="action-buttons">
                            <button onClick={addToCart} className="add-to-cart-btn">
                                Add to Cart
                            </button>
                            <button onClick={buyNow} className="buy-now-btn">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;