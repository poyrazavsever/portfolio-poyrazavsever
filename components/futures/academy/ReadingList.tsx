/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardHeader,
  CardImage,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "poyraz-ui/molecules";
import { Icon } from "@iconify/react";
import Image from "next/image";

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
    status: "Read",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Career",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
    status: "Reading",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    category: "Architecture",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
    status: "Queue",
  },
];

const videos = [
  {
    title: "Namaste JavaScript",
    author: "Akshay Saini",
    platform: "YouTube",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
    status: "Watched",
  },
  {
    title: "System Design Primer",
    author: "Gaurav Sen",
    platform: "YouTube",
    link: "#",
    image: "https://www.color-hex.com/palettes/36931.png",
    status: "Watching",
  },
];

export function ReadingList() {
  return (
    <Tabs defaultValue="books" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="videos">Videos & Courses</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="books">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card
              key={book.title}
              variant="default"
              className="group hover:border-red-600 transition-colors h-full flex flex-col"
            >
              <CardImage className="aspect-2/3 relative overflow-hidden border-b border-dashed border-slate-200">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    book.status === "Read"
                      ? "bg-emerald-500"
                      : book.status === "Reading"
                        ? "bg-amber-500"
                        : "bg-slate-500"
                  } text-white border-none`}
                >
                  {book.status}
                </Badge>
              </CardImage>

              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2 text-[10px]">
                  {book.category}
                </Badge>
                <CardTitle className="text-lg leading-tight group-hover:text-red-600 transition-colors">
                  {book.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow">
                <p className="text-sm text-slate-500">{book.author}</p>
              </CardContent>

              <CardFooter className="pt-4 border-t border-dashed border-slate-100 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  asChild
                >
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    View on Amazon{" "}
                    <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="videos">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.title}
              variant="default"
              className="group hover:border-red-600 transition-colors h-full flex flex-col"
            >
              <CardImage className="aspect-video relative overflow-hidden border-b border-dashed border-slate-200">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Icon icon="mdi:play" className="w-6 h-6 ml-1" />
                  </div>
                </div>
              </CardImage>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{video.platform}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      video.status === "Watched"
                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                        : "text-amber-600 border-amber-200 bg-amber-50"
                    }
                  >
                    {video.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                  {video.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-slate-500">{video.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
