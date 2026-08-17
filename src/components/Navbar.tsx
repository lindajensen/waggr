import { PawPrint, Bell } from "lucide-react";

import DogSwitcher from "./DogSwitcher";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-2 mb-4 pb-4 border-b border-cream">
      <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center">
        <div className="w-6 h-6 bg-surface rounded-full flex items-center justify-center">
          <PawPrint fill="text-foreground" size={14} />
        </div>
      </div>
      <p className="font-heading text-2xl">waggr</p>
      <div className="h-6 border-l border-cream" />
      <DogSwitcher />
      <div className="ml-auto h-8 w-8 bg-surface border border-cream rounded-full flex items-center justify-center">
        <Bell size={16} />
      </div>
    </nav>
  );
}
