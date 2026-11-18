"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface ApplicationItem {
  _id: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  preferredSchedule: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = () => {
    api
      .get("/api/applications/my-applications")
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await api.delete(`/api/applications/${id}`);
      toast.success("Application cancelled");
      fetchApps();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to cancel");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">My Tuition Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your booking status or cancel pending requests.
        </p>
      </div>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tuition Title</TableHead>
              <TableHead>Tutor Email</TableHead>
              <TableHead>Monthly Fee</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading applications...</TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  You haven&apos;t applied to any tuitions yet.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell className="font-semibold">{app.tuitionTitle}</TableCell>
                  <TableCell className="text-muted-foreground">{app.tutorEmail}</TableCell>
                  <TableCell>৳{app.monthlyFee}</TableCell>
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        app.status === "accepted"
                          ? "bg-emerald-600 text-white"
                          : app.status === "rejected"
                          ? "bg-destructive text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(app._id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}