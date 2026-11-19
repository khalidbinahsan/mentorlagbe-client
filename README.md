# MentorLagbe — Smart Tuition & Mentorship Platform

**Live Site URL:** https://mentorlagbe-client-flame.vercel.app/

## Purpose
MentorLagbe is a full-stack, role-based EdTech and tuition management platform designed to connect students with admin-verified tutors for 1-on-1 home mentorship or structured online batches. Students can search and filter approved tuitions by subject, class level, and mode, apply in real time, and track booking status, while Tutors manage batch listings and student enrollments, and Admins moderate listings, user roles, and Stripe subscription payments.

---

## Test Credentials (Pre-Seeded)
* **Admin Email:** `admin@mentorlagbe.com`
* **Admin Password:** `Password123!`
* **Tutor Email (Pro):** `tutor@mentorlagbe.com`
* **Tutor Password:** `Password123!`
* **Student Email:** `student@mentorlagbe.com`
* **Student Password:** `Password123!`

---

## Key Features
* **Role-Based Authentication & Authorization:** Powered by BetterAuth (MongoDB Adapter) and custom Express JWT middlewares (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`).
* **Server-Side Search, Filtering & Pagination:** Dynamic search by title/subject, filtering by class level and Online/Offline mode, and MongoDB `.skip()` / `.limit()` pagination.
* **Role-Restricted Application Workflow:** Only authenticated Students can apply for tuitions (with duplicate-application prevention and pending cancellation), while Tutors accept or reject applicants.
* **Direct Image Upload via ImgBB API:** Seamless profile picture and tuition banner file uploads directly from the browser.
* **Stripe Subscription Integration:** One-click upgrade to **Student Pro ($10)** and **Tutor Pro ($15)** plans with automatic database sync.
* **Responsive Role Dashboards & Dark/Light Mode:** Dedicated dashboards for Students, Tutors, and Admins with persistent session reload protection.

---

## Tech Stack & NPM Packages Used
* **Frontend:** `next`, `react`, `typescript`, `tailwindcss`, `shadcn/ui`, `lucide-react`, `better-auth`, `axios`, `sonner`, `next-themes`
* **Backend:** `express`, `mongodb`, `better-auth`, `jsonwebtoken`, `stripe`, `cors`, `dotenv`