import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  timeAgo: string;
  detail: string;
}

export default function StatusCard({
  icon,
  title,
  timeAgo,
  detail,
}: StatusCardProps) {
  const Icon = icon;

  return (
    <article className="bg-surface rounded-3xl p-4">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <Icon size={20} className="text-[#4a5d4a]" />
          </div>
          <h2 className="text-lg">{title}</h2>
        </div>
      </header>

      <div>
        <p className="text-2xl font-bold mb-1">{timeAgo}</p>
        <p className="text-muted font-semibold text-sm">{detail}</p>
      </div>
    </article>
  );
}
