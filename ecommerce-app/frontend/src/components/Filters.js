import React, { useState } from 'react';
import './Filters.css';

function Filters({ filters, onFilterChange }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
    const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Amazon'];
    const ratings = [4, 3, 2, 1];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    const applyFilters = () => {
        onFilterChange(localFilters);
    };

    const resetFilters = () => {
        const resetValues = {
            category: '',
            brand: '',
            minPrice: '',
            maxPrice: '',
            rating: '',
            search: '',
        };
        setLocalFilters(resetValues);
        onFilterChange(resetValues);
    };

    return (
        <div className="filters">
            <h3>Filters</h3>

            <div className="filter-group">
                <label>Search</label>
                <input
                    type="text"
                    name="search"
                    value={localFilters.search}
                    onChange={handleChange}
                    placeholder="Search products..."
                    className="filter-input"
                />
            </div>

            <div className="filter-group">
                <label>Category</label>
                <select name="category" value={localFilters.category} onChange={handleChange} className="filter-select">
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Brand</label>
                <select name="brand" value={localFilters.brand} onChange={handleChange} className="filter-select">
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Price Range</label>
                <div className="price-range">
                    <input
                        type="number"
                        name="minPrice"
                        value={localFilters.minPrice}
                        onChange={handleChange}
                        placeholder="Min"
                        className="price-input"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        name="maxPrice"
                        value={localFilters.maxPrice}
                        onChange={handleChange}
                        placeholder="Max"
                        className="price-input"
                    />
                </div>
            </div>

            <div className="filter-group">
                <label>Minimum Rating</label>
                <select name="rating" value={localFilters.rating} onChange={handleChange} className="filter-select">
                    <option value="">Any Rating</option>
                    {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}+ Stars</option>
                    ))}
                </select>
            </div>

            <div className="filter-actions">
                <button onClick={applyFilters} className="apply-btn">Apply Filters</button>
                <button onClick={resetFilters} className="reset-btn">Reset</button>
            </div>
        </div>
    );
}

export default Filters;