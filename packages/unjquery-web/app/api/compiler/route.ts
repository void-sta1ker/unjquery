import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import unjquery from "unjquery-core/dist/unjquery.js";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { code } = await request.json();

  await prisma.$connect();

  try {
    const result = await unjquery(code);

    await prisma.log.create({
      data: {
        data: code,
        success: true,
      },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    await prisma.log.create({
      data: {
        data: code,
        success: false,
      },
    });

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
