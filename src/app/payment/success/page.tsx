"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, refreshUser } = useAuth();
  const [status, setStatus] = useState<"verifying" | "verified" | "error">("verifying");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    api
      .post("/api/payments/verify-session", { sessionId })
      .then(async () => {
        await refreshUser();
        setStatus("verified");
      })
      .catch(() => setStatus("error"));
  }, [sessionId, refreshUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {status === "verifying" && (
        <p className="text-lg font-medium">Verifying your Stripe payment...</p>
      )}

      {status === "verified" && (
        <div className="max-w-md space-y-4">
          <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
          <h1 className="text-3xl font-extrabold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your account has been upgraded to the <strong>Pro Plan</strong>. Thank you for supporting MentorLagbe!
          </p>
          <Link
            href={user ? `/dashboard/${user.role}` : "/"}
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Could not verify payment</h1>
          <p className="text-muted-foreground">
            Please check your dashboard or contact support if your card was charged.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg border font-medium text-sm"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}