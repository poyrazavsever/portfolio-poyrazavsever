import { Project } from "@/types/project";

export const fullstackPageData = {
  title: "Full-Stack Architecture",
  headerHighlight: "Deep Dives",
  description:
    "Explore complex server-side logic, database schema designs, and microservices architecture. Real-world solutions for real-world problems.",
};

export const fullstackCases: Project[] = [
  {
    title: "Microservices with NestJS",
    description:
      "A deep dive into building scalable microservices using NestJS, RabbitMQ, and Docker. Covers inter-service communication and fault tolerance.",
    coverImage: "https://placehold.co/600x400/1e293b/white?text=Microservices",
    tags: ["NestJS", "RabbitMQ", "Docker", "Microservices"],
    year: "2024",
    category: "Architecture",
    mermaid: `
      graph TD
        Client[Client] --> API_Gateway[API Gateway / NestJS]
        API_Gateway --> Auth_Service[Auth Service]
        API_Gateway --> Order_Service[Order Service]
        API_Gateway --> Product_Service[Product Service]
        
        Order_Service --> RabbitMQ[RabbitMQ Message Broker]
        RabbitMQ --> Inventory_Service[Inventory Service]
        RabbitMQ --> Notification_Service[Notification Service]
        
        Order_Service --> OrderDB[(Order DB)]
        Product_Service --> ProductDB[(Product DB)]
        Auth_Service --> Redis[(Redis Cache)]
    `,
    galleryImages: [
      "https://placehold.co/1200x800/1e293b/white?text=System+Diagram",
      "https://placehold.co/1200x800/1e293b/white?text=Queue+Architecture",
    ],
    links: {
      repo: "https://github.com/poyrazavsever/nestjs-microservices",
    },
  },
  {
    title: "Real-time Chat Application",
    description:
      "Architecture of a high-concurrency chat application using Socket.io, Redis adapter, and React. Optimized for low latency.",
    coverImage: "https://placehold.co/600x400/0f172a/white?text=Real-time+Chat",
    tags: ["Socket.io", "Redis", "React", "Node.js"],
    year: "2023",
    category: "Real-time",
    galleryImages: [
      "https://placehold.co/1200x800/0f172a/white?text=Websocket+Flow",
      "https://placehold.co/1200x800/0f172a/white?text=Redis+PubSub",
    ],
    links: {
      repo: "https://github.com/poyrazavsever/chat-app-architecture",
    },
  },
  {
    title: "E-commerce Database Schema",
    description:
      "Designing a robust PostgreSQL schema for a multi-tenant e-commerce platform. Includes complex relationships, indexing strategies, and PL/pgSQL functions.",
    coverImage: "https://placehold.co/600x400/dc2626/white?text=DB+Schema",
    tags: ["PostgreSQL", "Database Design", "SQL", "Optimization"],
    year: "2024",
    category: "Database",
    galleryImages: [
      "https://placehold.co/1200x800/dc2626/white?text=ER+Diagram",
      "https://placehold.co/1200x800/dc2626/white?text=Query+Optimization",
    ],
    links: {
      repo: "https://github.com/poyrazavsever/chat-app-architecture",
    },
  },
];
