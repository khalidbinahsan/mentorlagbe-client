"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/axios";
import TuitionCard, { TuitionItem } from "@/components/shared/TuitionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "Programming", "English", "IELTS"];
const CLASS_LEVELS = ["Class 6-8", "SSC", "HSC", "Undergraduate", "Admission / IELTS"];

export default function BrowseTuitionsPage() {
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [mode, setMode] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTuitions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/tuitions", {
        params: { search, subject, classLevel, mode, page, limit: 6 },
      });
      setTuitions(data.tuitions || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch {
      setTuitions([]);
    } finally {
      setLoading(false);
    }
  }, [search, subject, classLevel, mode, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTuitions();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchTuitions]);

  const resetFilters = () => {
    setSearch("");
    setSubject("");
    setClassLevel("");
    setMode("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Browse Verified Tuitions</h1>
        <p className="mt-2 text-muted-foreground">
          Showing {totalCount} admin-approved mentorship batches and 1-on-1 tuitions.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 rounded-xl border bg-card mb-8">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by tuition title or subject..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>

        <select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={classLevel}
          onChange={(e) => {
            setClassLevel(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Class Levels</option>
          {CLASS_LEVELS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              setPage(1);
            }}
            className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <Button variant="outline" size="icon" onClick={resetFilters} title="Reset Filters">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tuitions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-3 border rounded-xl p-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      ) : tuitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-xl bg-muted/20">
          <h3 className="text-lg font-semibold">No matching tuitions found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try clearing your search or changing filters.</p>
          <Button onClick={resetFilters} variant="outline" className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}

      {/* Server-Side Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Button
                key={pageNum}
                size="sm"
                variant={page === pageNum ? "default" : "outline"}
                className={page === pageNum ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}