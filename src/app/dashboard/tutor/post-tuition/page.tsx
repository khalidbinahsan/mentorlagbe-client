"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import api from "@/lib/axios";
import { uploadImageToImgBB } from "@/lib/imgbb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "Programming", "English", "IELTS"];
const CLASS_LEVELS = ["Class 6-8", "SSC", "HSC", "Undergraduate", "Admission / IELTS"];

export default function PostTuitionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Math");
  const [classLevel, setClassLevel] = useState("HSC");
  const [mode, setMode] = useState<"Online" | "Offline">("Online");
  const [location, setLocation] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("3");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setBannerImage(url);
      toast.success("Banner image uploaded via ImgBB!");
    } catch {
      toast.error("Failed to upload banner image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImage) {
      return toast.error("Please upload a banner image for your tuition post.");
    }

    setSubmitting(true);
    try {
      await api.post("/api/tuitions", {
        title,
        subject,
        classLevel,
        mode,
        location,
        monthlyFee: Number(monthlyFee),
        daysPerWeek: Number(daysPerWeek),
        description,
        bannerImage,
      });
      toast.success("Tuition posted! Waiting for Admin approval.");
      router.push("/dashboard/tutor/my-tuitions");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to post tuition");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Tuition or Batch</CardTitle>
          <CardDescription>
            Free Tutors can post up to 2 tuitions. Upgrade to Pro for unlimited listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Tuition / Batch Title</Label>
              <Input
                id="title"
                required
                placeholder="e.g., HSC Physics Complete Preparation Batch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Class Level</Label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {CLASS_LEVELS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Mode</Label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as "Online" | "Offline")}
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">Location / Platform</Label>
                <Input
                  id="location"
                  required
                  placeholder="e.g., Dhanmondi, Dhaka or Zoom"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fee">Monthly Fee (BDT ৳)</Label>
                <Input
                  id="fee"
                  type="number"
                  min={100}
                  required
                  placeholder="e.g., 3000"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="days">Days Per Week</Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  max={7}
                  required
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                />
              </div>
            </div>

            {/* Direct ImgBB Banner Image Upload */}
            <div className="space-y-2">
              <Label>Tuition Banner Image (ImgBB Upload)</Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Label
                  htmlFor="banner-file"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-background hover:bg-muted text-sm font-medium"
                >
                  <Upload className="h-4 w-4 text-emerald-600" />
                  {uploading ? "Uploading to ImgBB..." : "Choose Banner Image"}
                </Label>
                <Input
                  id="banner-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerUpload}
                  disabled={uploading}
                />
                {bannerImage && (
                  <img
                    src={bannerImage}
                    alt="Banner Preview"
                    className="h-20 w-36 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Course Syllabus &amp; Details</Label>
              <Textarea
                id="description"
                required
                rows={4}
                placeholder="Describe your teaching methodology, topics covered, and batch size..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting || uploading}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              {submitting ? "Posting Tuition..." : "Submit Tuition Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}