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

const courses = [
  {
    title: "0'dan React Dersleri - React 101",
    keyword: "React",
    description:
      "A comprehensive journey through the modern web stack. Learn React, State Management, Hooks...",
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
    title: "0'dan Next.js Dersleri - Next.js 101",
    keyword: "Next.js",
    description:
      "Build production-ready apps with Next.js. Server components, API routes, SSR, ISR...",
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
    title: "0'dan Node.js Dersleri - Node.js 101",
    keyword: "Node.js",
    description:
      "Backend development with Node.js. Express, REST APIs, Authentication, Database...",
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
    title: "0'dan TypeScript Dersleri - TypeScript 101",
    keyword: "TypeScript",
    description:
      "Type-safe development from scratch. Generics, utility types, advanced patterns...",
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

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const titleParts = course.title.split(course.keyword);

  return (
    <Card
      variant="elevated"
      className="flex flex-col min-w-[260px] w-[280px] shrink-0"
    >
      <CardHeader>
        <CardTitle>
          {titleParts[0]}
          <span className="text-red-600 font-secondary">{course.keyword}</span>
          {titleParts[1]}
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
            Buy Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CoursesSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header — right aligned like the design */}
        <div className="text-right mb-10">
          <Typography variant="h2">
            Did You See <br className="hidden sm:block" />
            My <span className="text-red-600 font-secondary">Courses</span>
          </Typography>
          <Typography variant="muted" className="mt-2 text-slate-500">
            Learn through real-world scenarios and industry standards.
          </Typography>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button size="sm" asChild>
              <a href="/learning">See All Courses</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/products">Browse Store</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="max-w-6xl mx-auto px-4">
        <HorizontalScroll className="flex gap-5 overflow-x-auto pb-6 pt-2 px-2 -mx-2 scrollbar-none">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}
