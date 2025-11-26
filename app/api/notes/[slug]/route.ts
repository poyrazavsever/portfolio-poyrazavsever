import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "content/notes");

const isValidSlug = (slug: string) => !slug.includes("/") && !slug.includes("..") && !slug.includes("\\");

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const resolvedParams = await params;
  const rawSlug = decodeURIComponent(resolvedParams.slug);

  if (!isValidSlug(rawSlug)) {
    return new NextResponse("Invalid note", { status: 400 });
  }

  const filePath = path.join(NOTES_DIR, `${rawSlug}.pdf`);

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new NextResponse("Not Found", { status: 404 });
    }
    console.error(`Error serving note ${rawSlug}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
