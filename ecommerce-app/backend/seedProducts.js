const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
    {
        name: "iPhone 14 Pro",
        price: 999,
        description: "Latest iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island",
        category: "Electronics",
        brand: "Apple",
        rating: 4.8,
        stock: 50,
        image: "https://images.unsplash.com/photo-1678652190465-3c2f6ad6ca32?w=300"
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        price: 1199,
        description: "Android flagship with S Pen, 200MP camera, and Snapdragon 8 Gen 2",
        category: "Electronics",
        brand: "Samsung",
        rating: 4.7,
        stock: 45,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300"
    },
    {
        name: "Nike Air Max 270",
        price: 150,
        description: "Comfortable running shoes with Air Max cushioning",
        category: "Clothing",
        brand: "Nike",
        rating: 4.5,
        stock: 100,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
    },
    {
        name: "Adidas Ultraboost",
        price: 180,
        description: "Energy-returning running shoes with Boost technology",
        category: "Clothing",
        brand: "Adidas",
        rating: 4.6,
        stock: 80,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300"
    },
    {
        name: "The Great Gatsby",
        price: 15,
        description: "Classic novel by F. Scott Fitzgerald",
        category: "Books",
        brand: "Penguin",
        rating: 4.7,
        stock: 200,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300"
    },
    {
        name: "Sony WH-1000XM5",
        price: 399,
        description: "Industry-leading noise canceling headphones",
        category: "Electronics",
        brand: "Sony",
        rating: 4.9,
        stock: 30,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300"
    },
    {
        name: "Levi's 501 Jeans",
        price: 89,
        description: "Classic straight fit jeans",
        category: "Clothing",
        brand: "Levi's",
        rating: 4.4,
        stock: 150,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300"
    },
    {
        name: "Coffee Table",
        price: 199,
        description: "Modern coffee table for living room",
        category: "Home",
        brand: "IKEA",
        rating: 4.3,
        stock: 25,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300"
    },
    {
        name: "MacBook Pro 14",
        price: 1999,
        description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD",
        category: "Electronics",
        brand: "Apple",
        rating: 4.9,
        stock: 25,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300"
    },
    {
        name: "Wireless Mouse",
        price: 29,
        description: "Ergonomic wireless mouse with Bluetooth",
        category: "Electronics",
        brand: "Logitech",
        rating: 4.3,
        stock: 200,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300"
    },
    {
        name: "Yoga Mat",
        price: 25,
        description: "Non-slip exercise mat for yoga and fitness",
        category: "Sports",
        brand: "Nike",
        rating: 4.4,
        stock: 120,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300"
    },
    {
        name: "Desk Lamp",
        price: 45,
        description: "LED desk lamp with adjustable brightness",
        category: "Home",
        brand: "IKEA",
        rating: 4.5,
        stock: 75,
        image: "https://images.unsplash.com/photo-1507473885765-e6b057e526df?w=300"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        await Product.deleteMany({});
        await Product.insertMany(sampleProducts);
        console.log('Database seeded successfully! Added', sampleProducts.length, 'products');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();