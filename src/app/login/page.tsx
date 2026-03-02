"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.error) {
            setError(res.error);
        } else {
            router.push("/");
            router.refresh();
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
                    <h1 className="text-4xl font-medium tracking-wide mb-4 text-black">Log in to SHVshop</h1>
                    <p className="text-black mb-10">Enter your details below</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

                        <div className="flex items-center justify-between mt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-accent text-white px-12 py-4 rounded font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>

                            <Link href="#" className="text-accent hover:underline">
                                Forget Password?
                            </Link>
                        </div>

                    </form>

                    <p className="mt-8 text-center text-gray-500">
                        Don't have account?{" "}
                        <Link href="/signup" className="text-black font-medium border-b border-black pb-0.5 ml-2 hover:text-gray-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
