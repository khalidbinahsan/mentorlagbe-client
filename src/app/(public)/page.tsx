import Link from "next/link";
import { Search, BookOpen, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TuitionCard, { TuitionItem } from "@/components/shared/TuitionCard";

async function getFeaturedTuitions(): Promise<TuitionItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.tuitions || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredTuitions = await getFeaturedTuitions();

  return (
    <div className="flex flex-col">
      {/* 1. Hero / Banner Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-emerald-50/70 via-background to-background dark:from-emerald-950/20 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1">
              #1 Smart Tuition &amp; Mentorship Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Find Your Ideal <span className="text-emerald-600">Tutor</span> or Mentorship Batch Today
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Connect with verified subject-matter experts for 1-on-1 home guidance or interactive online batches across Physics, Math, Programming, and IELTS.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                    href="/tuitions"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors"
                >
                    <Search className="h-4 w-4 shrink-0" />
                    <span>Browse Tuitions</span>
                </Link>

                <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-input bg-background hover:bg-muted font-semibold text-sm transition-colors"
                >
                    <span>Become a Tutor</span>
                </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
              alt="Students and Mentor collaborating"
              className="rounded-2xl shadow-xl border object-cover w-full h-[380px]"
            />
          </div>
        </div>
      </section>

      {/* 2. Dynamic Featured Tuitions Section (6 Latest Approved & Active) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Tuitions &amp; Batches</h2>
            <p className="mt-2 text-muted-foreground">
              Explore recently approved courses from verified mentors across Bangladesh and online.
            </p>
          </div>
          <Link
            href="/tuitions"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-input bg-background hover:bg-muted text-sm font-medium"
          >
            <span>View All Tuitions</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featuredTuitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">
              No featured tuitions available right now. Start your backend server or run the seed script.
            </p>
          </div>
        )}
      </section>

      {/* 3. Extra Section 1 — How MentorLagbe Works */}
      <section className="py-20 bg-muted/40 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight">How MentorLagbe Works</h2>
            <p className="mt-2 text-muted-foreground">
              A transparent, role-verified workflow designed for both learners and educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">
                  1
                </div>
                <CardTitle>Create Your Role Account</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Sign up as a Student to explore verified tuition batches, or register as a Tutor to showcase your teaching expertise.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">
                  2
                </div>
                <CardTitle>Filter, Match &amp; Apply</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Students filter listings by subject, class level, and Online/Offline mode, then submit a tailored schedule request in one click.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">
                  3
                </div>
                <CardTitle>Get Accepted &amp; Start Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Tutors review applicant profiles in their dashboard, accept enrollments, and begin structured mentorship sessions.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Extra Section 2 — Top Subjects & Platform Statistics */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Popular Subjects &amp; Platform Impact</h2>
          <p className="mt-2 text-muted-foreground">
            Specialized academic tracks taught by university graduates and industry mentors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { name: "Mathematics", count: "120+ Batches" },
            { name: "Physics & Chemistry", count: "95+ Batches" },
            { name: "Programming & ICT", count: "80+ Batches" },
            { name: "IELTS & English", count: "65+ Batches" },
          ].map((subj) => (
            <Link
              key={subj.name}
              href="/tuitions"
              className="p-6 rounded-xl border bg-card hover:border-emerald-600 transition text-center space-y-2"
            >
              <BookOpen className="h-6 w-6 text-emerald-600 mx-auto" />
              <h3 className="font-bold">{subj.name}</h3>
              <p className="text-xs text-muted-foreground">{subj.count}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl bg-emerald-600 text-white p-8 text-center">
          <div>
            <div className="text-3xl font-extrabold">2,400+</div>
            <div className="text-sm text-emerald-100 mt-1">Active Students Enrolled</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">450+</div>
            <div className="text-sm text-emerald-100 mt-1">Admin-Verified Tutors</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">98%</div>
            <div className="text-sm text-emerald-100 mt-1">Parent &amp; Learner Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 5. Pricing / Subscription Section */}
      <section className="py-20 bg-muted/40 border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pro Plans</h2>
            <p className="mt-2 text-muted-foreground">
              Start free and upgrade anytime via Stripe to unlock unlimited tuition posts or priority booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Starter (Free)</CardTitle>
                <div className="text-3xl font-extrabold mt-2">$0 <span className="text-sm font-normal text-muted-foreground">/forever</span></div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2.5 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Browse all approved tuitions</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tutors can post up to 2 tuitions</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Real-time application tracking</div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg border border-input bg-background hover:bg-muted text-sm font-medium"
                >
                  Get Started Free
                </Link>
              </CardFooter>
            </Card>

            {/* Student Pro */}
            <Card className="flex flex-col border-emerald-600 shadow-md">
              <CardHeader>
                <Badge className="w-fit bg-emerald-600 text-white mb-1">For Learners</Badge>
                <CardTitle>Student Pro</CardTitle>
                <div className="text-3xl font-extrabold mt-2">$10 <span className="text-sm font-normal text-muted-foreground">/one-time</span></div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2.5 text-sm">
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Priority tutor application review</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Verified Pro Learner badge</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Unlimited batch applications</div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
                >
                  Subscribe with Stripe
                </Link>
              </CardFooter>
            </Card>

            {/* Tutor Pro */}
            <Card className="flex flex-col border-emerald-600 shadow-md">
              <CardHeader>
                <Badge className="w-fit bg-emerald-600 text-white mb-1">Most Popular</Badge>
                <CardTitle>Tutor Pro</CardTitle>
                <div className="text-3xl font-extrabold mt-2">$15 <span className="text-sm font-normal text-muted-foreground">/one-time</span></div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2.5 text-sm">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Unlimited tuition batch posts</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Priority listing placement</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Verified Pro Educator badge</div>
              </CardContent>
              <CardFooter>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
                >
                  Subscribe with Stripe
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}