import { Typography } from "poyraz-ui/atoms";
import { Camera, Gamepad2, BookOpen, Music } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

interface AboutInterestsProps {
  dictionary: Dictionary;
}

export function AboutInterests({ dictionary }: AboutInterestsProps) {
  const { interests: interestsDict } = dictionary.about;

  const icons = [
    <Camera key="camera" className="w-5 h-5" />,
    <Gamepad2 key="gamepad" className="w-5 h-5" />,
    <BookOpen key="book" className="w-5 h-5" />,
    <Music key="music" className="w-5 h-5" />,
  ];

  const interests = interestsDict.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section className="container mx-auto px-4 max-w-6xl py-12 md:py-20 border-t border-dashed border-slate-200">
      <Typography
        variant="h2"
        className="text-3xl md:text-4xl font-bold mb-8 text-left"
      >
        {interestsDict.title}{" "}
        <span className="text-red-600 font-secondary">
          {interestsDict.highlight}
        </span>
      </Typography>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {interests.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col items-start gap-3 p-6 border border-dashed border-slate-200 hover:border-red-600/50 hover:bg-slate-50 transition-colors"
          >
            <div className="p-2 bg-white border border-dashed border-slate-300 group-hover:text-red-600 transition-colors">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{item.label}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
