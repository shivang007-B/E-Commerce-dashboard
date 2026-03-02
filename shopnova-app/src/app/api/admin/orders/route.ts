import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized. Admin access only." }, { status: 403 });
        }

        await connectToDatabase();

        // Fetch all orders for the admin dashboard
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate("userId", "name email")
            .populate("products.productId", "name image category");

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Fetch all orders error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
