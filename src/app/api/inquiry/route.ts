import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const required = ["company", "email", "garment", "quantity", "details"];
  const missing = required.filter((key) => !String(form.get(key) ?? "").trim());

  if (missing.length) {
    return NextResponse.json(
      { ok: false, message: `Please complete required fields: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  // Intentionally does not store or email inquiries yet.
  // Connect a database and transactional email provider before launch.
  return NextResponse.json(
    {
      ok: false,
      message:
        "The inquiry form is currently in preview mode and has not sent your request. Please connect the approved business email and inquiry storage before launch."
    },
    { status: 501 }
  );
}