import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        await dbConnect();

        let query: any = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Fetch products error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        /* Temporary bypass auth since NextAuth isn't fully set up yet
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized. Admin access only." }, { status: 403 });
        }
        */

        const body = await req.json();
        await dbConnect();

        const product = await Product.create(body);

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
