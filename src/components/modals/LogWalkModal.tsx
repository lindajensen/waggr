"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { addWalk } from "@/lib/actions";
import { X, Check, TreeDeciduous, AlertCircle } from "lucide-react";

interface LogWalkModalProps {
  onClose: () => void;
  onSuccess: (title: string, subtitle?: string) => void;
}

export default function LogWalkModal({
  onClose,
  onSuccess,
}: LogWalkModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [customDuration, setCustomDuration] = useState<string>("");
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
      const finalDuration =
        selectedDuration === "other" ? customDuration : selectedDuration;

      const formData = new FormData();

      formData.append("duration", finalDuration ?? "");
      formData.append("notes", notes ?? "");
      formData.append("pottyBreaks", JSON.stringify(pottyBreaks));
      formData.append("quickNotes", JSON.stringify(selectedQuickNotes));

      await addWalk(formData);

      const subtitle = `${finalDuration} min`;

      onSuccess("Walk logged", subtitle);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again");
    }
  }

  return (
    <section>
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center">
            <TreeDeciduous size={20} className="text-foreground" />
          </div>

          <div>
            <h1 className="text-xl font-medium" id="modal-title">
              Log Walk
            </h1>
            <p className="text-subtitle">Add details about the walk</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-muted cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>
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
                onClick={() =>
                  setSelectedDuration(
                    selectedDuration === duration ? null : duration,
                  )
                }
                className={
                  selectedDuration === duration
                    ? "bg-sand text-foreground text-sm rounded-full px-3 py-1.5 font-medium shadow-sm"
                    : "bg-surface border border-sand text-muted text-sm rounded-full px-3 py-1.5 font-medium"
                }
              >
                {duration} min
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setSelectedDuration(
                  selectedDuration === "other" ? null : "other",
                )
              }
              className={
                selectedDuration === "other"
                  ? "bg-sand text-foreground text-sm rounded-full px-3 py-1.5 font-medium shadow-sm"
                  : "bg-surface border border-sand text-muted text-sm rounded-full px-3 py-1.5 font-medium"
              }
            >
              Other
            </button>
          </div>

          {selectedDuration === "other" && (
            <input
              type="number"
              placeholder="Enter minutes"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-sand bg-background px-4 py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-sand"
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
                  ? "bg-sand text-foreground text-sm rounded-2xl px-3 py-3 font-medium shadow-sm flex-1 flex items-center justify-center gap-2"
                  : "bg-surface border border-sand text-muted text-sm rounded-2xl px-3 py-3 font-medium flex-1 flex items-center justify-center gap-2"
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
                  ? "bg-sand text-foreground text-sm rounded-2xl px-3 py-3 font-medium shadow-sm flex-1 flex items-center justify-center gap-2"
                  : "bg-surface border border-sand text-muted text-sm rounded-2xl px-3 py-3 font-medium flex-1 flex items-center justify-center gap-2"
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
            className="bg-surface border border-sand w-full rounded-2xl mt-2 px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-sand"
          />
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
                    ? "bg-sand text-foreground text-sm rounded-2xl px-3 py-1.5 font-medium shadow-sm flex items-center justify-center gap-2"
                    : "bg-surface border border-sand text-muted text-sm rounded-2xl px-3 py-1.5 font-medium flex items-center justify-center gap-2"
                }
              >
                {quickNote}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <div className="flex items-start gap-2 bg-blush border border-blush-hover text-foreground rounded-2xl px-4 py-3 text-sm mb-4">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          className="bg-sand text-foreground hover:bg-sand-hover px-4 h-15 w-full rounded-3xl font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={
            !selectedDuration ||
            (selectedDuration === "other" && !customDuration)
          }
        >
          Save Walk
        </button>

        {(!selectedDuration ||
          (selectedDuration === "other" && !customDuration)) && (
          <p className="text-xs text-muted text-center mt-2">
            Select a duration to save this walk
          </p>
        )}
      </form>
    </section>
  );
}
