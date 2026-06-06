import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { Rsvp } from "@/models/Rsvp";

const rsvpSchema = z
  .object({
    guestName: z.string().trim().min(2).max(120),
    attending: z.literal(true),
    companions: z.array(z.string().trim().min(2).max(120)).max(10),
  });

export async function POST(request: Request) {
  try {
    const parsed = rsvpSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Veuillez vérifier les informations saisies." },
        { status: 400 }
      );
    }

    await connectMongo();
    await Rsvp.create(parsed.data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return NextResponse.json(
      { message: "Impossible d'enregistrer votre réponse pour le moment." },
      { status: 500 }
    );
  }
}
