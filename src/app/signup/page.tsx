"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!res.ok) {
        setError(data?.message || "Failed to create account");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a2a] px-4">
      <div className="w-full max-w-md rounded-2xl border border-blue-800/50 bg-white/5 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="CreditFlow AI Logo"
            width={200}
            height={80}
            className="h-auto w-auto max-w-[200px] object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-blue-200">
          Sign up to get started with Credit Flow AI.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-200"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-blue-800/50 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-blue-300/60 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-blue-800/50 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-blue-300/60 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-blue-800/50 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-blue-300/60 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-blue-200">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-300 underline-offset-4 hover:text-emerald-200 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
