import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    image: string;
    images?: string[];
    category: string;
    rating?: number;
    reviewCount?: number;
    tags?: string[];
    isFlashSale?: boolean;
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
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
}, {
    timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
