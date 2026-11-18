"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle2, Clock, Sparkles } from "lucide-react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentOverviewPage() {
  const [stats, setStats] = useState({
    totalApplied: 0,
    acceptedCount: 0,
    pendingCount: 0,
    plan: "free",
  });

  useEffect(() => {
    api.get("/api/users/dashboard-stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    { title: "Total Applied Tuitions", value: stats.totalApplied, icon: FileText },
    { title: "Accepted Applications", value: stats.acceptedCount, icon: CheckCircle2 },
    { title: "Pending Applications", value: stats.pendingCount, icon: Clock },
    { title: "Current Plan", value: stats.plan.toUpperCase(), icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Student Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
                <Icon className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold">{c.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}