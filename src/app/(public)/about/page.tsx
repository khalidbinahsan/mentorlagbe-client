import Link from "next/link";
import { ShieldCheck, Users, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight">About MentorLagbe</h1>
        <p className="text-muted-foreground leading-relaxed">
          MentorLagbe bridges the gap between dedicated educators and students seeking structured, trustworthy academic guidance—both online and at home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border bg-card space-y-2">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
          <h3 className="font-bold text-lg">Admin-Moderated Quality</h3>
          <p className="text-sm text-muted-foreground">
            Every tuition post is reviewed by platform administrators before going live to ensure accurate fees, schedules, and credentials.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card space-y-2">
          <Users className="h-8 w-8 text-emerald-600" />
          <h3 className="font-bold text-lg">Role-Tailored Workflows</h3>
          <p className="text-sm text-muted-foreground">
            Dedicated dashboards allow Students to track applications, Tutors to manage batches, and Admins to oversee platform operations.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card space-y-2">
          <BookOpen className="h-8 w-8 text-emerald-600" />
          <h3 className="font-bold text-lg">Flexible Learning Modes</h3>
          <p className="text-sm text-muted-foreground">
            Filter effortlessly between interactive online batches and in-person home mentorship tailored to your class level and budget.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/tuitions"
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm"
        >
          Explore Approved Tuitions
        </Link>
      </div>
    </div>
  );
}