// @ts-nocheck
// Invalid page with business logic/data mutation
import { db } from '../../db';

export default async function Page() {
  const data = await db.query('SELECT * FROM users'); // Allowed if just fetching, but let's say mutation is bad
  return <div>{data.length}</div>;
}

export async function POST() {
  // Mutation in page! Invalid
}
