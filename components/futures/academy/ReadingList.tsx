/* eslint-disable @next/next/no-img-element */
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
import { Dictionary } from "@/types/dictionary";
import { AdminReadingItem } from "@/types/admin";
import { Locale } from "@/i18n-config";

interface ReadingListProps {
  dictionary: Dictionary;
  items: AdminReadingItem[];
  locale: Locale;
}

export function ReadingList({ dictionary, items, locale }: ReadingListProps) {
  const { readingList: rDict } = dictionary.academy;

  const books = items.filter((item) => item.type === "book");
  const videos = items.filter((item) => item.type === "video");

  return (
    <Tabs defaultValue="books" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          <TabsTrigger value="books">{rDict.tabs.books}</TabsTrigger>
          <TabsTrigger value="videos">{rDict.tabs.videos}</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="books">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              variant="default"
              className="group hover:border-red-600 transition-colors h-full flex flex-col"
            >
              <CardImage className="aspect-2/3 relative overflow-hidden border-b border-dashed border-slate-200 bg-slate-50">
                {book.image ? (
                  <img
                    src={book.image}
                    alt={locale === "tr" ? book.title_tr : book.title_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      icon="mdi:book-open-blank-variant"
                      className="w-12 h-12 text-slate-300"
                    />
                  </div>
                )}
                <Badge
                  className={`absolute top-2 right-2 ${
                    book.status === "read"
                      ? "bg-emerald-500"
                      : book.status === "reading"
                        ? "bg-amber-500"
                        : "bg-slate-500"
                  } text-white border-none`}
                >
                  {
                    rDict.labels.status[
                      book.status as keyof typeof rDict.labels.status
                    ]
                  }
                </Badge>
              </CardImage>

              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-2 text-[10px]">
                  {locale === "tr" ? book.category_tr : book.category_en}
                </Badge>
                <CardTitle className="text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                  {locale === "tr" ? book.title_tr : book.title_en}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow">
                <p className="text-sm text-slate-500">
                  {locale === "tr" ? book.author_tr : book.author_en}
                </p>
              </CardContent>

              {book.link && (
                <CardFooter className="pt-4 border-t border-dashed border-slate-100 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    asChild
                  >
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {rDict.labels.viewOnAmazon}{" "}
                      <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="videos">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              variant="default"
              className="group hover:border-red-600 transition-colors h-full flex flex-col"
            >
              <CardImage className="aspect-video relative overflow-hidden border-b border-dashed border-slate-200 bg-slate-50">
                {video.image ? (
                  <img
                    src={video.image}
                    alt={locale === "tr" ? video.title_tr : video.title_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      icon="mdi:youtube"
                      className="w-16 h-16 text-slate-300"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <a
                    href={video.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                  >
                    <Icon icon="mdi:play" className="w-6 h-6 ml-1" />
                  </a>
                </div>
              </CardImage>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{video.platform}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      video.status === "watched"
                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                        : "text-amber-600 border-amber-200 bg-amber-50"
                    }
                  >
                    {
                      rDict.labels.status[
                        video.status as keyof typeof rDict.labels.status
                      ]
                    }
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-red-600 transition-colors line-clamp-2">
                  {locale === "tr" ? video.title_tr : video.title_en}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-slate-500">
                  {locale === "tr" ? video.author_tr : video.author_en}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
