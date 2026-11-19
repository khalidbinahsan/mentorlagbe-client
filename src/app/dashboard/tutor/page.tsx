"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Users, Sparkles } from "lucide-react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TutorOverviewPage() {
  const [stats, setStats] = useState({
    totalPosted: 0,
    approvedCount: 0,
    totalApplicants: 0,
    plan: "free",
  });

  useEffect(() => {
    api.get("/api/users/dashboard-stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    { title: "Total Tuitions Posted", value: stats.totalPosted, icon: BookOpen },
    { title: "Approved Tuitions", value: stats.approvedCount, icon: CheckCircle2 },
    { title: "Total Applicants Received", value: stats.totalApplicants, icon: Users },
    { title: "Current Plan", value: stats.plan.toUpperCase(), icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Tutor Overview</h1>
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