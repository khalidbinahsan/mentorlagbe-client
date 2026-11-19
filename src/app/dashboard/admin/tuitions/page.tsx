"use client";

import { useEffect, useState } from "react";
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

interface AdminTuition {
  _id: string;
  title: string;
  subject: string;
  tutorName: string;
  tutorEmail: string;
  monthlyFee: number;
  approvalStatus: "pending" | "approved" | "rejected";
}

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<AdminTuition[]>([]);

  const fetchTuitions = () => {
    api.get("/api/admin/tuitions").then((res) => setTuitions(res.data));
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleApproval = async (id: string, approvalStatus: "approved" | "rejected") => {
    try {
      await api.patch(`/api/admin/tuitions/${id}/status`, { approvalStatus });
      toast.success(`Tuition marked as ${approvalStatus}`);
      fetchTuitions();
    } catch {
      toast.error("Failed to update tuition status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Tuition Approval Queue</h1>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Moderation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tuitions.map((t) => (
              <TableRow key={t._id}>
                <TableCell className="font-semibold max-w-xs truncate">{t.title}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{t.tutorName}</div>
                  <div className="text-xs text-muted-foreground">{t.tutorEmail}</div>
                </TableCell>
                <TableCell>{t.subject}</TableCell>
                <TableCell>৳{t.monthlyFee}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      t.approvalStatus === "approved"
                        ? "bg-emerald-600 text-white"
                        : t.approvalStatus === "rejected"
                        ? "bg-destructive text-white"
                        : "bg-amber-500 text-white"
                    }
                  >
                    {t.approvalStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={t.approvalStatus === "approved"}
                    onClick={() => handleApproval(t._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={t.approvalStatus === "rejected"}
                    onClick={() => handleApproval(t._id, "rejected")}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}