import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            maxlength: [100, "Name cannot be more than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
            min: [0, "Price cannot be less than 0"],
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
        },
        stock: {
            type: Number,
            required: [true, "Please provide stock count"],
            min: [0, "Stock cannot be less than 0"],
            default: 10,
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
