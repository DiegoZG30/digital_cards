import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "El registro publico esta deshabilitado. Contacta a tu administrador." },
    { status: 403 }
  );
}
