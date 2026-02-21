import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, creditScore } = body as {
      name?: string;
      email?: string;
      creditScore?: number | string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    let score: number | null = null;
    if (creditScore !== undefined && creditScore !== null && creditScore !== "") {
      const parsedScore = typeof creditScore === "string" ? Number(creditScore) : creditScore;
      if (!Number.isNaN(parsedScore) && parsedScore >= 300 && parsedScore <= 850) {
        score = parsedScore;
      } else if (creditScore !== "") {
        return NextResponse.json(
          { message: "Credit score must be between 300 and 850" },
          { status: 400 },
        );
      }
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.toLowerCase().trim();

    await prisma.productUpdateLead.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        creditScore: score,
      },
    });

    return NextResponse.json(
      { message: "You're signed up for product updates." },
      { status: 201 },
    );
  } catch (e) {
    console.error("Product update signup error:", e);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
