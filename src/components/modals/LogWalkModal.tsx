"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { addWalk } from "@/lib/actions";
import { X, Check, TreeDeciduous, AlertCircle } from "lucide-react";

interface LogWalkModalProps {
  onClose: () => void;
}

export default function LogWalkModal({ onClose }: LogWalkModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [pottyBreaks, setPottyBreaks] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [selectedQuickNotes, setSelectedQuickNotes] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  const durations = ["10", "15", "20", "30", "45", "60"];

  const quickNoteOptions = [
    "High energy",
    "Calm walk",
    "Met other dogs",
    "Met new people",
    "Good leash walking",
    "Pulled on leash",
    "Recall practice",
    "Park/forrest walk",
    "New route",
  ];

  function toggleArrayValue(
    value: string,
    setState: Dispatch<SetStateAction<string[]>>,
  ) {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();

      formData.append("duration", selectedDuration ?? "");
      formData.append("notes", notes ?? "");
      formData.append("pottyBreaks", JSON.stringify(pottyBreaks));
      formData.append("quickNotes", JSON.stringify(selectedQuickNotes));

      await addWalk(formData);

      onClose();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again");
    }
  }

  return (
    <section>
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#d4e1d4] flex items-center justify-center">
            <TreeDeciduous size={20} className="text-[#4a5d4a]" />
          </div>
          <div>
            <h1 className="text-xl font-medium" id="modal-title">
              Log Walk
            </h1>
            <p className="text-subtitle">Add details about the walk</p>
          </div>
        </div>

        <div>
          {" "}
          <X size={20} className="text-muted" onClick={onClose} />
        </div>
      </header>

      <div className="divider"></div>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className="field-label">Duration (minutes)</legend>
          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setSelectedDuration(duration)}
                className={
                  selectedDuration === duration
                    ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm"
                    : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
                }
              >
                {duration}m
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedDuration("other")}
              className={
                selectedDuration === "other"
                  ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm"
                  : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
              }
            >
              Other
            </button>
          </div>

          {selectedDuration === "other" && (
            <input
              type="number"
              placeholder="Enter minutes"
              className="mt-2 w-full rounded-2xl border border-[#e5ddd3] bg-[#fff9f3] px-4 py-1.5 text-sm text-[#1c1917] placeholder:text-[#6b6560] focus:outline-none focus:border-[#5c5553]"
            />
          )}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="field-label">Potty Break</legend>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleArrayValue("pee", setPottyBreaks)}
              className={
                pottyBreaks.includes("pee")
                  ? "bg-[#5c5553] text-white text-sm rounded-2xl px-3 py-3 font-medium shadow-sm flex-1 flex items-center justify-center gap-2"
                  : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-2xl px-3 py-3 font-medium flex-1 flex items-center justify-center gap-2"
              }
            >
              <span>Pee</span>
              {pottyBreaks.includes("pee") && <Check size={18} />}
            </button>

            <button
              type="button"
              onClick={() => toggleArrayValue("poop", setPottyBreaks)}
              className={
                pottyBreaks.includes("poop")
                  ? "bg-[#5c5553] text-white text-sm rounded-2xl px-3 py-3 font-medium shadow-sm flex-1 flex items-center justify-center gap-2"
                  : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-2xl px-3 py-3 font-medium flex-1 flex items-center justify-center gap-2"
              }
            >
              <span>Poop</span>
              {pottyBreaks.includes("poop") && <Check size={18} />}
            </button>
          </div>
        </fieldset>

        <div className="mb-4">
          <label htmlFor="notes" className="field-label">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[#fff9f3] border border-[#e5ddd3] w-full rounded-2xl mt-2 px-4 py-2 text-sm text-[#1c1917] placeholder:text-[#6b6560] focus:outline-none focus:border-[#5c5553]"
          ></textarea>
        </div>

        <fieldset className="mb-4">
          <legend className="field-label">Quick Notes</legend>
          <div className="flex flex-wrap gap-2">
            {quickNoteOptions.map((quickNote) => (
              <button
                key={quickNote}
                type="button"
                onClick={() =>
                  toggleArrayValue(quickNote, setSelectedQuickNotes)
                }
                className={
                  selectedQuickNotes.includes(quickNote)
                    ? "bg-[#d4e1d4] text-[#4a5d4a] text-sm rounded-2xl px-3 py-1.5 font-medium shadow-sm flex items-center justify-center gap-2"
                    : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-2xl px-3 py-1.5 font-medium flex items-center justify-center gap-2"
                }
              >
                {quickNote}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <div className="flex items-start gap-2 bg-[#f9e4e0] border border-[#f0c9c2] text-[#b3564a] rounded-2xl px-4 py-3 text-sm mb-4">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          className="bg-[#5c5552] text-white hover:bg-[#4A4441] shadow-[#5C5552]/20 px-4 h-15 w-full rounded-3xl font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!selectedDuration}
        >
          Save Walk
        </button>

        {!selectedDuration && (
          <p className="text-xs text-muted text-center mt-2">
            Select a duration to save this walk
          </p>
        )}
      </form>
    </section>
  );
}
