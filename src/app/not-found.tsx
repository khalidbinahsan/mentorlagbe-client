import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-emerald-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page or tuition listing you are looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center h-10 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}