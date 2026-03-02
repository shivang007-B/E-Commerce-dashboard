"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong.");
            }
        } catch (err) {
            setError("An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-200px)] pt-10 pb-20 bg-white">
            {/* Left side Image Placeholder */}
            <div className="w-full md:w-1/2 flex items-center justify-start mb-10 md:mb-0">
                <div className="w-full max-w-[805px] h-[781px] bg-[#CBE4E8] rounded-r flex items-center justify-center relative overflow-hidden">
                    {/* Mock image representing the shopping cart and phone from the design */}
                    <div className="absolute w-[80%] h-[80%] bg-[url('/images/signup-side.png')] bg-contain bg-center bg-no-repeat opacity-50"></div>
                    <span className="text-gray-500 font-medium z-10">[Shopping Image Placeholder]</span>
                </div>
            </div>

            {/* Right side Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <div className="w-full max-w-[370px]">
                    <h1 className="text-4xl font-medium tracking-wide mb-4 text-black">Create an account</h1>
                    <p className="text-black mb-10">Enter your details below</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black text-black bg-transparent"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black text-black bg-transparent"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-black text-black bg-transparent mb-2"
                            required
                        />

                        {error && <p className="text-accent text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-white py-4 rounded font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                        <button
                            type="button"
                            className="w-full border border-gray-300 text-black py-4 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign up with Google
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500">
                        Already have account?{" "}
                        <Link href="/login" className="text-black font-medium border-b border-black pb-0.5 ml-2 hover:text-gray-700">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
