import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "poyraz-ui/atoms";
import { Icon } from "@iconify/react";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";
import { Dictionary } from "@/types/dictionary";

const staticCourses = [
  {
    rating: 4.7,
    students: [
      { name: "Ali", avatar: "/logo/logo.jpeg" },
      { name: "Ayşe", avatar: "/logo/logo.jpeg" },
      { name: "Mehmet", avatar: "/logo/logo.jpeg" },
      { name: "Zeynep", avatar: "/logo/logo.jpeg" },
    ],
    href: "https://www.udemy.com",
  },
  {
    rating: 4.8,
    students: [
      { name: "Can", avatar: "/logo/logo.jpeg" },
      { name: "Elif", avatar: "/logo/logo.jpeg" },
      { name: "Deniz", avatar: "/logo/logo.jpeg" },
      { name: "Burak", avatar: "/logo/logo.jpeg" },
    ],
    href: "https://www.udemy.com",
  },
  {
    rating: 4.6,
    students: [
      { name: "Selin", avatar: "/logo/logo.jpeg" },
      { name: "Emre", avatar: "/logo/logo.jpeg" },
      { name: "Gizem", avatar: "/logo/logo.jpeg" },
      { name: "Kaan", avatar: "/logo/logo.jpeg" },
    ],
    href: "https://www.udemy.com",
  },
  {
    rating: 4.9,
    students: [
      { name: "Arda", avatar: "/logo/logo.jpeg" },
      { name: "Yağmur", avatar: "/logo/logo.jpeg" },
      { name: "Ozan", avatar: "/logo/logo.jpeg" },
      { name: "Beren", avatar: "/logo/logo.jpeg" },
    ],
    href: "https://www.udemy.com",
  },
];

interface CourseData {
  titlePrefix: string;
  keyword: string;
  titleSuffix: string;
  description: string;
  rating: number;
  students: { name: string; avatar: string }[];
  href: string;
}

function CourseCard({
  course,
  buyText,
}: {
  course: CourseData;
  buyText: string;
}) {
  return (
    <Card
      variant="elevated"
      className="flex flex-col min-w-[260px] w-[280px] shrink-0"
    >
      <CardHeader>
        <CardTitle>
          {course.titlePrefix}
          <span className="text-red-600 font-secondary">{course.keyword}</span>
          {course.titleSuffix}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex items-center justify-between">
          {/* Student avatars */}
          <div className="flex -space-x-2">
            {course.students.map((student, i) => (
              <Avatar
                key={i}
                className="h-7 w-7 border-2 border-white rounded-full"
              >
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Icon icon="mdi:star" className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold text-slate-700">
              {course.rating}/5
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <a href={course.href} target="_blank" rel="noopener noreferrer">
            {buyText}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface CoursesSectionProps {
  dictionary: Dictionary;
}

export function CoursesSection({ dictionary }: CoursesSectionProps) {
  const { courses: coursesDict } = dictionary.home;

  const courses: CourseData[] = staticCourses.map((course, i) => ({
    ...course,
    ...coursesDict.items[i],
  }));

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header — right aligned like the design */}
        <div className="text-right mb-10">
          <Typography variant="h2">
            {coursesDict.title} <br className="hidden sm:block" />
            {/* "My" word handling might be tricky with "Did You See My", but let's assume title covers the prefix */}
            <span className="text-red-600 font-secondary">
              {coursesDict.highlight}
            </span>
          </Typography>
          <Typography variant="muted" className="mt-2 text-slate-500">
            {coursesDict.subtitle}
          </Typography>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button size="sm" asChild>
              <a href="/learning">{coursesDict.buttons.seeAll}</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/products">{coursesDict.buttons.browse}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="max-w-6xl mx-auto px-4">
        <HorizontalScroll className="flex gap-5 overflow-x-auto pb-6 pt-2 px-2 -mx-2 scrollbar-none">
          {courses.map((course) => (
            <CourseCard
              key={course.keyword}
              course={course}
              buyText={coursesDict.buttons.buy}
            />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}
