import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                price: Number,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                image: String,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        paymentId: {
            type: String,
            required: false, // Razorpay distinct Order ID or Payment ID
        },
        shippingAddress: {
            street: String,
            city: String,
            postalCode: String,
        }
    },
    { timestamps: true }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ paymentId: 1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
