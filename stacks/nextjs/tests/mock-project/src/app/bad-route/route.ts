import { db } from "@/db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function GET() {
  const hash = crypto.createHash("md5").update("bad").digest("hex");
  const id = uuidv4();
  // Call db directly
  await db.query.users.findMany();
  return Response.json({ ok: true });
}
