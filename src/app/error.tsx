"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-destructive">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">An unexpected error occurred while loading this page.</p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}