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

interface ApplicantItem {
  _id: string;
  tuitionTitle: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: "pending" | "accepted" | "rejected";
}

export default function TutorApplicantsPage() {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = () => {
    api
      .get("/api/applications/tutor-applicants")
      .then((res) => setApplicants(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusUpdate = async (id: string, status: "accepted" | "rejected") => {
    try {
      await api.patch(`/api/applications/${id}/status`, { status });
      toast.success(`Application ${status}`);
      fetchApplicants();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Manage Student Applicants</h1>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Tuition Post</TableHead>
              <TableHead>Phone &amp; Schedule</TableHead>
              <TableHead>Learning Note</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Decision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading applicants...</TableCell>
              </TableRow>
            ) : applicants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No student applications received yet.
                </TableCell>
              </TableRow>
            ) : (
              applicants.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>
                    <div className="font-semibold">{a.studentName}</div>
                    <div className="text-xs text-muted-foreground">{a.studentEmail}</div>
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{a.tuitionTitle}</TableCell>
                  <TableCell className="text-xs">
                    <div>{a.studentPhone}</div>
                    <div className="text-muted-foreground">{a.preferredSchedule}</div>
                  </TableCell>
                  <TableCell className="max-w-xs text-xs text-muted-foreground">{a.studentNote}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        a.status === "accepted"
                          ? "bg-emerald-600 text-white"
                          : a.status === "rejected"
                          ? "bg-destructive text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={a.status === "accepted"}
                      onClick={() => handleStatusUpdate(a._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={a.status === "rejected"}
                      onClick={() => handleStatusUpdate(a._id, "rejected")}
                    >
                      Reject
                    </Button>
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