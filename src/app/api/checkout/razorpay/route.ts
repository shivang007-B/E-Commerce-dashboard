import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { items, totalAmount, shippingAddress } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }

        await dbConnect();

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID as string,
            key_secret: process.env.RAZORPAY_KEY_SECRET as string,
        });

        // 1. Create a Razorpay Order
        // amount in subunits (paise for INR)
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const rzpOrder = await razorpay.orders.create(options);

        // 2. Save Pending Order to Database
        const newOrder = await Order.create({
            userId: (session.user as any).id,
            products: items.map((item: any) => ({
                productId: item.id || item._id, // item.id from Zustand
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            totalAmount,
            paymentStatus: "pending",
            paymentId: rzpOrder.id, // Store Rzp order ID initially
            shippingAddress,
        });

        return NextResponse.json({
            orderId: rzpOrder.id,
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
            dbOrderId: newOrder._id,
        });

    } catch (error) {
        console.error("Razorpay order error:", error);
        return NextResponse.json({ message: "Error creating Razorpay order" }, { status: 500 });
    }
}
