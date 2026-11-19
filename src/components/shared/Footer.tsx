import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import CurrentYear from "./CurrentYear";
export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <GraduationCap className="h-7 w-7 text-emerald-600" />
            <span>
              Mentor<span className="text-emerald-600">Lagbe</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Connecting students with verified subject-matter tutors for personalized 1-on-1 mentorship and structured academic batches.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><Link href="/tuitions" className="hover:text-emerald-600">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-emerald-600">Pro Plans</Link></li>
            <li><Link href="/about" className="hover:text-emerald-600">How It Works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-600" /> support@mentorlagbe.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-600" /> +880 1711-000000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-600" /> Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (formerly Twitter)"
              className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 rounded-full border flex items-center justify-center text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
            >
              in
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 rounded-full border flex items-center justify-center text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
            >
              f
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © <CurrentYear /> MentorLagbe. All rights reserved.
    </div>
    </footer>
  );
}