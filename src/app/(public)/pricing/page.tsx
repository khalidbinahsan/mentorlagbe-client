"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(false);

  const handleStripeCheckout = async () => {
    if (!user) {
      toast.info("Please sign in first to upgrade your account.");
      return router.push("/sign-in");
    }
    if (user.plan === "pro") {
      return toast.success("You are already on the Pro Plan!");
    }

    setLoadingPlan(true);
    try {
      const { data } = await api.post("/api/payments/create-checkout-session");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to start Stripe checkout");
      setLoadingPlan(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
          Stripe Secure Checkout
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Upgrade to MentorLagbe Pro</h1>
        <p className="mt-3 text-muted-foreground">
          Unlock unlimited tuition listings as a Tutor or priority booking and verified status as a Student.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free Starter</CardTitle>
            <div className="text-3xl font-extrabold mt-2">$0</div>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Search &amp; filter all tuitions</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Up to 2 tuition posts for Tutors</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Standard application queue</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled className="w-full">
              {user?.plan === "free" ? "Current Plan" : "Included"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-emerald-600 shadow-md">
          <CardHeader>
            <Badge className="w-fit bg-emerald-600 text-white mb-1">Student Pro</Badge>
            <CardTitle>Pro Learner</CardTitle>
            <div className="text-3xl font-extrabold mt-2">$10 <span className="text-xs font-normal text-muted-foreground">USD</span></div>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 text-sm">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Priority tutor application placement</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Pro Student profile badge</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Direct schedule notes &amp; tracking</div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStripeCheckout}
              disabled={loadingPlan || user?.role === "tutor" || user?.plan === "pro"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {user?.plan === "pro" && user?.role === "student"
                ? "Active Pro Plan"
                : loadingPlan
                ? "Redirecting..."
                : "Upgrade Student Pro ($10)"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-emerald-600 shadow-md">
          <CardHeader>
            <Badge className="w-fit bg-emerald-600 text-white mb-1">Tutor Pro</Badge>
            <CardTitle>Pro Educator</CardTitle>
            <div className="text-3xl font-extrabold mt-2">$15 <span className="text-xs font-normal text-muted-foreground">USD</span></div>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Unlimited tuition batch postings</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Verified Pro Tutor status</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Full applicant management tools</div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStripeCheckout}
              disabled={loadingPlan || user?.role === "student" || user?.plan === "pro"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {user?.plan === "pro" && user?.role === "tutor"
                ? "Active Pro Plan"
                : loadingPlan
                ? "Redirecting..."
                : "Upgrade Tutor Pro ($15)"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}