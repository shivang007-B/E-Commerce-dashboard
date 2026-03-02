import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Fetch orders for the logged-in user
        const orders = await Order.find({ userId: (session.user as any).id })
            .sort({ createdAt: -1 })
            .populate("products.productId", "name image category");

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
