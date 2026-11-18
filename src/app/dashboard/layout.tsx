"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  PlusCircle,
  BookOpen,
  Users,
  CheckSquare,
  CreditCard,
  UserCog,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  const roleLinks =
    user.role === "student"
      ? [
          { name: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
          { name: "My Applications", href: "/dashboard/student/my-applications", icon: FileText },
        ]
      : user.role === "tutor"
      ? [
          { name: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard },
          { name: "Post a Tuition", href: "/dashboard/tutor/post-tuition", icon: PlusCircle },
          { name: "My Tuitions", href: "/dashboard/tutor/my-tuitions", icon: BookOpen },
          { name: "Applicants", href: "/dashboard/tutor/applicants", icon: Users },
        ]
      : [
          { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
          { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
          { name: "Approve Tuitions", href: "/dashboard/admin/tuitions", icon: CheckSquare },
          { name: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
        ];

  const sharedLinks = [
    { name: "Update Profile", href: "/dashboard/profile", icon: UserCog },
    { name: "Back to Home", href: "/", icon: Home },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 px-5 border-b flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <GraduationCap className="h-7 w-7 text-emerald-600" />
            <span>
              Mentor<span className="text-emerald-600">Lagbe</span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge variant="secondary" className="capitalize text-[10px] px-1.5 py-0">
                {user.role}
              </Badge>
              <Badge className="uppercase text-[10px] px-1.5 py-0 bg-emerald-600 text-white">
                {user.plan}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1">
          {roleLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="my-3 border-t" />

          {sharedLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-md border" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-bold text-lg capitalize">{user.role} Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            {user.plan === "free" && user.role !== "admin" && (
              <Link
                href="/pricing"
                className="inline-flex items-center h-9 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                Upgrade to Pro
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}