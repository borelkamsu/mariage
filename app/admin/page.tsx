import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { Rsvp } from "@/models/Rsvp";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Types } from "mongoose";

type StoredRsvp = {
  _id: Types.ObjectId;
  guestName: string;
  attending: boolean;
  companions: string[];
  createdAt: Date;
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isValidAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  await connectMongo();
  const responses = await Rsvp.find().sort({ createdAt: -1 }).lean<StoredRsvp[]>();
  const serialized = responses.map((response) => ({
    id: response._id.toString(),
    guestName: response.guestName,
    attending: response.attending,
    companions: response.companions,
    createdAt: response.createdAt.toISOString(),
  }));

  return <AdminDashboard responses={serialized} />;
}
