import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import './HomePage.css';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        sort: 'createdAt',
        order: 'desc',
        search: '',
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await axios.get(`http://localhost:5000/api/products?${queryParams}`);
            setProducts(response.data.products);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalProducts: response.data.totalProducts,
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };

    return (
        <div className="homepage">
            <div className="hero-section">
                <h1>Welcome to ShopEase</h1>
                <p>Discover amazing products at great prices</p>
            </div>

            <div className="content-section">
                <aside className="sidebar">
                    <Filters filters={filters} onFilterChange={handleFilterChange} />
                </aside>

                <main className="main-content">
                    <div className="results-info">
                        <p>Found {pagination.totalProducts} products</p>
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange({ sort: e.target.value })}
                            className="sort-select"
                        >
                            <option value="createdAt">Newest First</option>
                            <option value="price">Price: Low to High</option>
                            <option value="price" onClick={() => handleFilterChange({ order: 'desc' })}>
                                Price: High to Low
                            </option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {pagination.totalPages > 1 && (
                                <div className="pagination">
                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`page-btn ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default HomePage;