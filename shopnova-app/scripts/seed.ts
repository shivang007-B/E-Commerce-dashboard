const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Temporary Mongoose Schema definition for seeding to bypass TS imports
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isFlashSale: { type: Boolean, default: false },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const initialProducts = [
    {
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        originalPrice: 160,
        description: "PlayStation 4 standard gaming controller featuring advanced haptic feedback.",
        image: "/images/product-1.png",
        images: ["/images/product-1.png"],
        category: "Gaming",
        rating: 5,
        reviewCount: 88,
        isFlashSale: true
    },
    {
        name: "AK-900 Wired Keyboard",
        price: 960,
        originalPrice: 1160,
        description: "Mechanical wired keyboard with RGB backlighting.",
        image: "/images/product-2.png",
        images: ["/images/product-2.png"],
        category: "Computers",
        rating: 4,
        reviewCount: 75,
        isFlashSale: true
    },
    {
        name: "IPS LCD Gaming Monitor",
        price: 370,
        originalPrice: 400,
        description: "27-inch 144Hz IPS Gaming Monitor.",
        image: "/images/product-3.png",
        images: ["/images/product-3.png"],
        category: "Computers",
        rating: 5,
        reviewCount: 99,
        isFlashSale: true
    },
    {
        name: "S-Series Comfort Chair",
        price: 375,
        originalPrice: 400,
        description: "Ergonomic comfort setup for long gaming sessions.",
        image: "/images/product-4.png",
        images: ["/images/product-4.png"],
        category: "Lifestyle",
        rating: 4.5,
        reviewCount: 99,
        isFlashSale: true
    }
];

async function seedDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(initialProducts);
        console.log(`Inserted ${initialProducts.length} products`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDB();
