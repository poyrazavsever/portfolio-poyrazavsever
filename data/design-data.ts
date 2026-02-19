import { ShowcaseProject } from "@/types/showcase";

export const designPageData = {
  title: "Design",
  headerHighlight: "Showcase",
  description:
    "A collection of user interface designs, design systems, and brand identities. Crafted with attention to detail and usability.",
};

export const designProjects: ShowcaseProject[] = [
  {
    id: "1",
    title: "Fintech Dashboard UI",
    description:
      "A comprehensive dashboard design for a modern fintech application. Focuses on data visualization, clean typography, and a dark mode interface.",
    client: "FinOne",
    year: "2024",
    coverImage: "https://placehold.co/800x600/1e293b/white?text=Fintech+Cover",
    galleryImages: [
      "https://placehold.co/1200x800/1e293b/white?text=Dashboard+Overview",
      "https://placehold.co/1200x800/1e293b/white?text=Analytics+View",
      "https://placehold.co/1200x800/1e293b/white?text=Transactions",
      "https://placehold.co/1200x800/1e293b/white?text=Settings",
    ],
    tags: ["UI/UX", "Dashboard", "Figma", "Dark Mode"],
    category: "UI Design",
  },
  {
    id: "2",
    title: "Travel App Concept",
    description:
      "Mobile application concept for a travel booking platform. Features a card-based layout, immersive imagery, and smooth micro-interactions.",
    client: "Personal Project",
    year: "2023",
    coverImage: "https://placehold.co/800x600/0ea5e9/white?text=Travel+App",
    galleryImages: [
      "https://placehold.co/600x1200/0ea5e9/white?text=Onboarding",
      "https://placehold.co/600x1200/0ea5e9/white?text=Home+Screen",
      "https://placehold.co/600x1200/0ea5e9/white?text=Destination+Detail",
      "https://placehold.co/600x1200/0ea5e9/white?text=Booking+Flow",
    ],
    tags: ["Mobile App", "iOS", "Prototyping"],
    category: "Mobile App",
  },
  {
    id: "3",
    title: "E-Commerce Design System",
    description:
      "A modular design system for a large-scale e-commerce platform. Includes atomic components, color tokens, and accessibility guidelines.",
    client: "Shopify Theme",
    year: "2024",
    coverImage: "https://placehold.co/800x600/10b981/white?text=Design+System",
    galleryImages: [
      "https://placehold.co/1200x800/10b981/white?text=Typography+Scale",
      "https://placehold.co/1200x800/10b981/white?text=Color+Palette",
      "https://placehold.co/1200x800/10b981/white?text=Component+Library",
      "https://placehold.co/1200x800/10b981/white?text=Button+States",
    ],
    tags: ["Design System", "Documentation", "Accessibility"],
    category: "Design System",
  },
];
