import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const resolvedParams = await params;
        const product = await Product.findById(resolvedParams.id);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const resolvedParams = await params;
        const body = await req.json();

        const updatedProduct = await Product.findByIdAndUpdate(
            resolvedParams.id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Failed to update product:", error);
        return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const resolvedParams = await params;
        const product = await Product.findByIdAndDelete(resolvedParams.id);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
