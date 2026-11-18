import Link from "next/link";
import { BookOpen, MapPin, User, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TuitionItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  tutorName: string;
  description?: string;
  tutorEmail?: string;
}

export default function TuitionCard({ tuition }: { tuition: TuitionItem }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={tuition.bannerImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"}
          alt={tuition.title}
          className="h-full w-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-emerald-600 text-white">
          {tuition.mode}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <BookOpen className="h-3.5 w-3.5" /> {tuition.subject}
          </span>
          <span>{tuition.classLevel}</span>
        </div>
        <h3 className="font-bold text-lg line-clamp-2 leading-snug">{tuition.title}</h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate">{tuition.tutorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate">{tuition.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{tuition.daysPerWeek} days / week</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex items-center justify-between">
        <div>
          <span className="text-lg font-extrabold text-foreground">৳{tuition.monthlyFee}</span>
          <span className="text-xs text-muted-foreground"> /month</span>
        </div>
        <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href={`/tuitions/${tuition._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}