"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import Modal from "@/components/modals/Modal";
import LogWalkModal from "@/components/modals/LogWalkModal";
import LogFeedingModal from "@/components/modals/LogFeedingModal";
import Toast from "./Toast";

export default function QuickActions() {
  const [openModal, setOpenModal] = useState<"walk" | "feeding" | null>(null);

  const [toast, setToast] = useState<{
    title: string;
    subtitle?: string;
  } | null>(null);

  function handleLogSuccess(title: string, subtitle?: string) {
    setToast({ title, subtitle });
    setOpenModal(null);
  }

  return (
    <>
      <section className="flex flex-col gap-3 mt-4">
        <button
          className="bg-sand hover:bg-blue-gray-hover px-4 h-15 rounded-3xl font-bold cursor-pointer"
          onClick={() => setOpenModal("walk")}
        >
          <div className="flex items-center justify-center gap-1">
            <Plus size={17} />
            Log Walk
          </div>
        </button>

        <button
          className="bg-blush hover:bg-blush-hover px-4 h-15 rounded-3xl font-bold cursor-pointer"
          onClick={() => setOpenModal("feeding")}
        >
          <div className="flex items-center justify-center gap-1">
            <Plus size={17} />
            Log Feeding
          </div>
        </button>
      </section>

      {openModal === "walk" && (
        <Modal isOpen={true} onClose={() => setOpenModal(null)}>
          <LogWalkModal
            onClose={() => setOpenModal(null)}
            onSuccess={handleLogSuccess}
          />
        </Modal>
      )}

      {openModal === "feeding" && (
        <Modal isOpen={true} onClose={() => setOpenModal(null)}>
          <LogFeedingModal
            onClose={() => setOpenModal(null)}
            onSuccess={handleLogSuccess}
          />
        </Modal>
      )}

      {toast && (
        <Toast
          title={toast.title}
          subtitle={toast.subtitle}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
