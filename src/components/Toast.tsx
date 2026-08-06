"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  title: string;
  subtitle?: string;
  onDismiss: () => void;
}

export default function Toast({ title, subtitle, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-6 left-4 right-4 bg-[#d4e1d4] rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3">
      <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
        <Check size={16} className="text-[#4a5d4a]" />
      </div>

      <div>
        <p className="font-semibold text-[#4a5d4a] text-sm">{title}</p>
        {subtitle && <p className="text-xs text-[#4a5d4a]/70">{subtitle}</p>}
      </div>
    </div>
  );
}
