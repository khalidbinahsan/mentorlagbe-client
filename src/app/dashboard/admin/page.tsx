"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, Clock, DollarSign } from "lucide-react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    pendingTuitions: 0,
    approvedTuitions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    api.get("/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    { title: "Total Registered Users", value: stats.totalUsers, icon: Users },
    { title: "Total Tutors", value: stats.totalTutors, icon: GraduationCap },
    {
      title: "Pending / Approved Tuitions",
      value: `${stats.pendingTuitions} / ${stats.approvedTuitions}`,
      icon: Clock,
    },
    { title: "Total Stripe Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Admin Platform Overview</h1>
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