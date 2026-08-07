import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-security";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await request.json()) as { text?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text || text.length > 5000) {
      return NextResponse.json({ error: "Enter between 1 and 5,000 characters." }, { status: 400 });
    }

    const endpoint = new URL("https://translate.googleapis.com/translate_a/single");
    endpoint.searchParams.set("client", "gtx");
    endpoint.searchParams.set("sl", "en");
    endpoint.searchParams.set("tl", "ar");
    endpoint.searchParams.set("dt", "t");
    endpoint.searchParams.set("q", text);
    const response = await fetch(endpoint, { cache: "no-store", signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error("Translation service is unavailable.");
    const data = (await response.json()) as Array<Array<[string]>>;
    const translation = data[0]?.map((part) => part[0]).join("").trim();
    if (!translation) throw new Error("No translation was returned.");
    return NextResponse.json({ translation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to translate this field." },
      { status: 502 }
    );
  }
}
