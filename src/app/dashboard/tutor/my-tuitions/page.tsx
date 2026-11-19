"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface TutorTuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  description: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
}

export default function TutorMyTuitionsPage() {
  const [tuitions, setTuitions] = useState<TutorTuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TutorTuition | null>(null);

  const fetchMyTuitions = () => {
    api
      .get("/api/tuitions/my-tuitions")
      .then((res) => setTuitions(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const handleToggleActive = async (item: TutorTuition) => {
    try {
      await api.patch(`/api/tuitions/${item._id}`, { isActive: !item.isActive });
      toast.success(`Tuition marked as ${!item.isActive ? "Active" : "Closed"}`);
      fetchMyTuitions();
    } catch {
      toast.error("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/tuitions/${id}`);
      toast.success("Tuition deleted");
      fetchMyTuitions();
    } catch {
      toast.error("Failed to delete tuition");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await api.patch(`/api/tuitions/${editing._id}`, {
        title: editing.title,
        location: editing.location,
        monthlyFee: Number(editing.monthlyFee),
        daysPerWeek: Number(editing.daysPerWeek),
        description: editing.description,
      });
      toast.success("Tuition updated!");
      setEditing(null);
      fetchMyTuitions();
    } catch {
      toast.error("Failed to update tuition");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">My Created Tuitions</h1>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject / Level</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Admin Approval</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : tuitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No tuitions posted yet.
                </TableCell>
              </TableRow>
            ) : (
              tuitions.map((t) => (
                <TableRow key={t._id}>
                  <TableCell className="font-semibold max-w-xs truncate">{t.title}</TableCell>
                  <TableCell>{t.subject} ({t.classLevel})</TableCell>
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
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(t)}
                    >
                      {t.isActive ? "Active" : "Closed"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="outline" onClick={() => setEditing(t)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(t._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tuition Details</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Monthly Fee (৳)</Label>
                  <Input
                    type="number"
                    value={editing.monthlyFee}
                    onChange={(e) => setEditing({ ...editing, monthlyFee: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Days / Week</Label>
                  <Input
                    type="number"
                    value={editing.daysPerWeek}
                    onChange={(e) => setEditing({ ...editing, daysPerWeek: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  value={editing.location}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Updates
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}