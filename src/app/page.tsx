import sql from "@/lib/db";
import { TreeDeciduous, Bone } from "lucide-react";

import StatusCard from "@/components/StatusCard";
import EmptyStatusCard from "@/components/EmptyStatusCard";
import QuickActions from "@/components/QuickActions";

import { capitalize } from "@/lib/formatters";
import { getTimeAgo } from "@/lib/formatters";

export default async function Home() {
  const lastWalkResult = await sql`
  SELECT * FROM walks
  ORDER BY created_at DESC
  LIMIT 1
`;

  const lastFeedingResult = await sql`
  SELECT * FROM feedings
  ORDER BY fed_at DESC
  LIMIT 1
`;

  const lastWalk = lastWalkResult[0];
  const lastFeeding = lastFeedingResult[0];

  return (
    <main className="flex flex-col gap-2">
      {lastWalk ? (
        <StatusCard
          icon={TreeDeciduous}
          title="Last Walk"
          timeAgo={getTimeAgo(lastWalk.created_at)}
          detail={`${lastWalk.duration} min · ${lastWalk.potty_breaks?.map(capitalize).join(" & ")}`}
        />
      ) : (
        <EmptyStatusCard
          icon={TreeDeciduous}
          title="Last Walk"
          message="No walks logged yet"
          hint="Ready for your first stroll together?"
        />
      )}

      {lastFeeding ? (
        <StatusCard
          icon={Bone}
          title="Last Feeding"
          timeAgo={getTimeAgo(lastFeeding.fed_at)}
          detail={`${lastFeeding.portion_size} g · ${lastFeeding.food_type}`}
        />
      ) : (
        <EmptyStatusCard
          icon={Bone}
          title="Last Feeding"
          message="No meals logged yet"
          hint="Time to log the first bowl or treat?"
        />
      )}

      <QuickActions />
    </main>
  );
}
