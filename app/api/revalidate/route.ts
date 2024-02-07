import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");
  console.log("secret", secret);

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const { type, slug } = await request.json();
  console.log("type", type);
  console.log("slug", slug);

  revalidatePath(`/`, "layout");

  return NextResponse.json(
    { message: "Revalidated", date: Date.now() },
    {
      status: 200,
    }
  );
}
