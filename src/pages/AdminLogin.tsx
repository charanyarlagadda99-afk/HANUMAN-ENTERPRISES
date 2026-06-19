import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Leaf, LogIn } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid credentials. Try again.");
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f2e9] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl shadow-[#1b261d]/10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-md bg-[#2f6d43] text-white">
            <Leaf className="size-6" />
          </span>
          <div>
            <p className="font-black">Hanuman Enterprises</p>
            <p className="text-xs font-semibold text-[#7a5a36] uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-black text-[#26302b]">Sign In</h1>
        <p className="mt-1 text-sm text-[#60665f]">Access your leads dashboard</p>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="h-12 rounded-md border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="h-12 rounded-md border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
          />

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#2f6d43] font-black text-white transition hover:bg-[#245535] disabled:opacity-60"
          >
            {loading ? "Signing in..." : <><LogIn className="size-4" /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
}