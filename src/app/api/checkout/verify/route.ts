import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = await req.json();

        const secret = process.env.RAZORPAY_KEY_SECRET;

        if (!secret) {
            throw new Error("Missing RAZORPAY_KEY_SECRET environment variable");
        }

        // 1. Verify Signature using SHA256 HMAC
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            // Payment tampering detected
            await dbConnect();
            await Order.findByIdAndUpdate(dbOrderId, { paymentStatus: "failed", paymentId: razorpay_payment_id });
            return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
        }

        // 2. Payment Verified - Update Order in Database
        await dbConnect();

        const updatedOrder = await Order.findByIdAndUpdate(
            dbOrderId,
            {
                paymentStatus: "paid",
                paymentId: razorpay_payment_id // Update to actual payment ID rather than the initial order ID 
            },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found in database" }, { status: 404 });
        }

        return NextResponse.json({ message: "Payment verified successfully", order: updatedOrder });

    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
