"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, MapPin, User, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { TuitionItem } from "@/components/shared/TuitionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function TuitionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [tuition, setTuition] = useState<TuitionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [studentPhone, setStudentPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [studentNote, setStudentNote] = useState("");

  useEffect(() => {
    if (user?.phone) setStudentPhone(user.phone);
  }, [user]);

  useEffect(() => {
    api
      .get(`/api/tuitions/${id}`)
      .then((res) => setTuition(res.data))
      .catch(() => setTuition(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/api/applications", {
        tuitionId: id,
        studentPhone,
        preferredSchedule,
        studentNote,
      });
      toast.success("Application submitted! Track its status in your Student Dashboard.");
      setModalOpen(false);
      router.push("/dashboard/student/my-applications");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading tuition details...</div>;
  }

  if (!tuition) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold">Tuition Not Found</h2>
        <Link href="/tuitions" className="mt-4 text-emerald-600 hover:underline">
          ← Back to Browse Tuitions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/tuitions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Browse Tuitions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-72 w-full rounded-2xl overflow-hidden border">
            <img
              src={tuition.bannerImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"}
              alt={tuition.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-emerald-600 text-white text-sm px-3 py-1">
              {tuition.mode}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                {tuition.subject}
              </Badge>
              <Badge variant="secondary">{tuition.classLevel}</Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{tuition.title}</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl border bg-muted/30 text-sm">
            <div>
              <span className="text-muted-foreground block">Monthly Fee</span>
              <span className="text-xl font-extrabold text-emerald-600">৳{tuition.monthlyFee}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Schedule</span>
              <span className="font-semibold flex items-center gap-1.5 mt-0.5">
                <Calendar className="h-4 w-4 text-emerald-600" /> {tuition.daysPerWeek} days / week
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-muted-foreground block">Location / Platform</span>
              <span className="font-semibold flex items-center gap-1.5 mt-0.5">
                <MapPin className="h-4 w-4 text-emerald-600" /> {tuition.location}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Course &amp; Mentorship Overview</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {tuition.description}
            </p>
          </div>
        </div>

        {/* Sidebar: Tutor Card & Role-Restricted Apply Box */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mentor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 font-semibold text-base">
                <User className="h-5 w-5 text-emerald-600" />
                <span>{tuition.tutorName}</span>
              </div>
              {tuition.tutorEmail && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>{tuition.tutorEmail}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Verified {tuition.subject} Educator</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-600/50">
            <CardHeader>
              <CardTitle className="text-lg">Enroll in This Tuition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Please sign in with a <strong>Student</strong> account to apply for this tuition.
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm"
                  >
                    Sign In to Apply
                  </Link>
                </div>
              ) : user.role !== "student" ? (
                <div className="space-y-3">
                  <Button disabled className="w-full">
                    Apply Now (Students Only)
                  </Button>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    You are logged in as <strong>{user.role.toUpperCase()}</strong>. Only Student accounts can apply for tuitions.
                  </p>
                </div>
              ) : (
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer">
                    <CheckCircle2 className="h-4 w-4" /> Apply Now
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply for {tuition.title}</DialogTitle>
                      <DialogDescription>
                        Provide your contact details and preferred class timing for {tuition.tutorName}.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleApply} className="space-y-4 mt-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          required
                          placeholder="+88017XXXXXXXX"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="schedule">Preferred Schedule</Label>
                        <Input
                          id="schedule"
                          required
                          placeholder="e.g., Sat, Mon, Wed at 6:00 PM"
                          value={preferredSchedule}
                          onChange={(e) => setPreferredSchedule(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="note">Learning Goal / Note</Label>
                        <Textarea
                          id="note"
                          required
                          rows={3}
                          placeholder="Mention your current class, topics you need help with, etc."
                          value={studentNote}
                          onChange={(e) => setStudentNote(e.target.value)}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {submitting ? "Submitting..." : "Confirm Application"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}