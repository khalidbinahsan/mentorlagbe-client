import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-4">
      <XCircle className="h-16 w-16 text-destructive mx-auto" />
      <h1 className="text-3xl font-extrabold">Payment Cancelled</h1>
      <p className="text-muted-foreground max-w-md">
        Your Stripe checkout session was cancelled and no charges were made.
      </p>
      <Link
        href="/pricing"
        className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm"
      >
        Return to Pricing
      </Link>
    </div>
  );
}