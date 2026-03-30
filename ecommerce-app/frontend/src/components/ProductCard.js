import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const addToCart = (e) => {
        e.preventDefault();
        try {
            let cart = localStorage.getItem('cart');
            let cartArray = [];

            if (cart) {
                cartArray = JSON.parse(cart);
                if (!Array.isArray(cartArray)) {
                    cartArray = [];
                }
            }

            const existingItem = cartArray.find(item => item.product === product._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartArray.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cartArray));
            alert('Added to cart!');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`} className="product-link">
                <div className="product-image">
                    <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                    {product.rating >= 4.5 && (
                        <div className="product-badge">Bestseller</div>
                    )}
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-rating">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span>({product.rating})</span>
                    </div>
                    <div className="product-price">
                        ${product.price}
                        <small> USD</small>
                    </div>
                    <button onClick={addToCart} className="add-to-cart-btn-card">
                        Add to Cart
                    </button>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;