import { AdminBlogPost, AdminBlogComment } from "@/types/admin";

export const mockBlogPosts: AdminBlogPost[] = [
  {
    id: "1",
    slug: "nextjs-app-router-guide",
    title_tr: "Next.js App Router Rehberi",
    title_en: "Next.js App Router Guide",
    excerpt_tr:
      "Next.js 14 ile gelen App Router yapısını derinlemesine inceliyoruz.",
    excerpt_en:
      "A deep dive into the App Router architecture introduced in Next.js 14.",
    content_tr: `# Next.js App Router Rehberi

Next.js 14 ile birlikte gelen App Router, React Server Components üzerine inşa edilmiş yeni nesil bir yönlendirme sistemidir.

## Neden App Router?

- **Server Components** varsayılan olarak gelir
- **Streaming** ve **Suspense** desteği
- **Nested Layouts** ile daha iyi kod organizasyonu
- **Loading UI** ve **Error Boundaries** yerleşik

## Temel Kavramlar

### Layout

\`\`\`tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Page

Her \`page.tsx\` dosyası bir route oluşturur.

### Loading

\`loading.tsx\` ile otomatik loading state'leri yönetilir.

## Sonuç

App Router, modern web uygulamaları için güçlü bir altyapı sunar.`,
    content_en: `# Next.js App Router Guide

The App Router, introduced with Next.js 14, is a next-generation routing system built on top of React Server Components.

## Why App Router?

- **Server Components** by default
- **Streaming** and **Suspense** support
- **Nested Layouts** for better code organization
- Built-in **Loading UI** and **Error Boundaries**

## Core Concepts

### Layout

\`\`\`tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Page

Each \`page.tsx\` file creates a route.

### Loading

\`loading.tsx\` provides automatic loading states.

## Conclusion

App Router provides a powerful foundation for modern web applications.`,
    category: "tech",
    cover_image:
      "https://placehold.co/800x400/0f172a/white?text=Next.js+App+Router",
    read_time_min: 8,
    tags: ["Next.js", "React", "TypeScript"],
    is_published: true,
    published_at: "2024-06-15T10:00:00Z",
    created_at: "2024-06-10T10:00:00Z",
    updated_at: "2024-06-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "design-system-from-scratch",
    title_tr: "Sıfırdan Tasarım Sistemi Oluşturmak",
    title_en: "Building a Design System from Scratch",
    excerpt_tr:
      "Bir tasarım sistemi oluşturmanın tüm aşamalarını adım adım anlatıyorum.",
    excerpt_en:
      "Step-by-step walkthrough of building a complete design system.",
    content_tr: `# Sıfırdan Tasarım Sistemi

Bir tasarım sistemi oluşturmak, tutarlı ve ölçeklenebilir bir ürün geliştirmenin temelidir.

## Adımlar

1. **Design Tokens** tanımlayın
2. **Atomic Design** prensiplerini uygulayın
3. **Component API** tasarlayın
4. **Dokümantasyon** yazın`,
    content_en: `# Design System from Scratch

Building a design system is fundamental to developing a consistent and scalable product.

## Steps

1. Define **Design Tokens**
2. Apply **Atomic Design** principles
3. Design **Component API**
4. Write **Documentation**`,
    category: "design",
    cover_image: "https://placehold.co/800x400/dc2626/white?text=Design+System",
    read_time_min: 12,
    tags: ["Design System", "UI/UX", "Figma"],
    is_published: true,
    published_at: "2024-05-20T10:00:00Z",
    created_at: "2024-05-15T10:00:00Z",
    updated_at: "2024-05-20T10:00:00Z",
  },
  {
    id: "3",
    slug: "microservices-patterns",
    title_tr: "Mikroservis Mimarisi Desenleri",
    title_en: "Microservices Architecture Patterns",
    excerpt_tr:
      "Büyük ölçekli uygulamalarda kullanılan temel mikroservis desenlerini inceliyoruz.",
    excerpt_en:
      "Examining core microservice patterns used in large-scale applications.",
    category: "engineering",
    cover_image: "https://placehold.co/800x400/6366f1/white?text=Microservices",
    read_time_min: 15,
    tags: ["Architecture", "Docker", "Node.js"],
    is_published: false,
    created_at: "2024-07-01T10:00:00Z",
    updated_at: "2024-07-01T10:00:00Z",
  },
  {
    id: "4",
    slug: "react-server-components",
    title_tr: "React Server Components Derinlemesine",
    title_en: "React Server Components Deep Dive",
    excerpt_tr:
      "RSC'nin nasıl çalıştığını, avantajlarını ve dikkat edilmesi gerekenleri açıklıyorum.",
    excerpt_en: "How RSC works, its advantages, and what to watch out for.",
    category: "tech",
    cover_image: "https://placehold.co/800x400/3b82f6/white?text=RSC",
    read_time_min: 10,
    tags: ["React", "Server Components", "Performance"],
    is_published: true,
    published_at: "2024-04-10T10:00:00Z",
    created_at: "2024-04-05T10:00:00Z",
    updated_at: "2024-04-10T10:00:00Z",
  },
];

export const mockBlogComments: AdminBlogComment[] = [
  {
    id: "c1",
    post_id: "1",
    post_title: "Next.js App Router Rehberi",
    user_name: "Ahmet Yılmaz",
    content:
      "Harika bir yazı, çok faydalı oldu! Özellikle layout kısmı çok açıklayıcı.",
    is_approved: false,
    created_at: "2024-06-16T14:30:00Z",
  },
  {
    id: "c2",
    post_id: "1",
    post_title: "Next.js App Router Rehberi",
    user_name: "Elif Demir",
    content: "Server Components konusunu biraz daha açar mısınız?",
    is_approved: true,
    created_at: "2024-06-17T09:15:00Z",
  },
  {
    id: "c3",
    post_id: "2",
    post_title: "Sıfırdan Tasarım Sistemi",
    user_name: "Furkan Kaya",
    content: "Design tokens için hangi araçları kullanıyorsunuz?",
    is_approved: false,
    created_at: "2024-05-22T16:45:00Z",
  },
  {
    id: "c4",
    post_id: "4",
    post_title: "React Server Components",
    user_name: "Zeynep Arslan",
    content: "RSC hakkında okuduğum en kapsamlı Türkçe içerik. Teşekkürler!",
    is_approved: true,
    created_at: "2024-04-12T11:00:00Z",
  },
];
