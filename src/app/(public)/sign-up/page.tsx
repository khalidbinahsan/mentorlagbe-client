"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        plan: "free",
    } as any);

    setLoading(false);

    if (error) {
      return toast.error(error.message || "Registration failed");
    }

    toast.success(`Account created as ${role.toUpperCase()}! Welcome to MentorLagbe.`);
    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join MentorLagbe as a Student or Verified Tutor</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-1.5">
              <Label>I want to register as a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2.5 px-4 rounded-lg border text-sm font-semibold transition ${
                    role === "student"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "hover:bg-muted"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`py-2.5 px-4 rounded-lg border text-sm font-semibold transition ${
                    role === "tutor"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "hover:bg-muted"
                  }`}
                >
                  Tutor
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                placeholder="e.g., Tanvir Ahmed"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password (min 8 characters)</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-base bg-emerald-600 hover:bg-emerald-700 text-white">
            {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-emerald-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}