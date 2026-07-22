import sql from "@/lib/db";

export default async function Home() {
  const walks = await sql`SELECT * FROM walks`;

  return (
    <div>
      <h1>Walks: {walks.length}</h1>
    </div>
  );
}
