import { AcademyHero } from "@/components/futures/academy/AcademyHero";
import { ReadingList } from "@/components/futures/academy/ReadingList";

export default function ReadingListPage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <AcademyHero
        title="My Reading &"
        headerHighlight="Watch List"
        description="A curated collection of books, courses, and videos that shape my technical perspective."
        badge="Library"
      />

      <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-24">
        <ReadingList />
      </div>
    </div>
  );
}
