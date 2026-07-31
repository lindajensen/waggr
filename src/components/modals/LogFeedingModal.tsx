"use client";

import { useState } from "react";
import { Bone, X, AlertCircle } from "lucide-react";

interface LogFeedingModalProps {
  onClose: () => void;
}

export default function LogFeedingModal({ onClose }: LogFeedingModalProps) {
  const [selectedPortionSize, setSelectedPortionSize] = useState<string | null>(
    null,
  );
  const [customPortionSize, setCustomPortionSize] = useState<string>("");
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [customFoodType, setCustomFoodType] = useState<string>("");
  const [selectedAppetite, setSelectedAppetite] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const portionSizes = ["25", "50", "75", "100", "150", "200"];
  const foodTypes = [
    "Dry kibble",
    "Wet food",
    "Raw food (BARF)",
    "Kibble + Wet food",
    "Kibble + Topper",
    "Treats/Snacks",
  ];

  const appetiteOptions = ["Ate all", "Ate most", "Ate little", "Didn't eat"];

  //TODO: Committa
  //TODO: handleSubmit

  return (
    <section>
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#d4e1d4] flex items-center justify-center">
            <Bone size={20} className="text-[#4a5d4a]" />
          </div>
          <div>
            <h1 className="text-xl font-medium" id="modal-title">
              Log Feeding
            </h1>
            <p className="text-subtitle">Record meal portions & food details</p>
          </div>
        </div>

        <div>
          {" "}
          <X size={20} className="text-muted" onClick={onClose} />
        </div>
      </header>

      <div className="divider"></div>

      <form>
        <fieldset className="mb-4">
          <legend className="field-label">Portion Size</legend>
          <div className="flex flex-wrap gap-2">
            {portionSizes.map((portionSize) => (
              <button
                key={portionSize}
                type="button"
                onClick={() =>
                  setSelectedPortionSize(
                    selectedPortionSize === portionSize ? null : portionSize,
                  )
                }
                className={
                  selectedPortionSize === portionSize
                    ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm border border-transparent"
                    : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
                }
              >
                {portionSize}g
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setSelectedPortionSize(
                  selectedPortionSize === "other" ? null : "other",
                )
              }
              className={
                selectedPortionSize === "other"
                  ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm border border-transparent"
                  : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
              }
            >
              Other
            </button>
          </div>

          {selectedPortionSize === "other" && (
            <input
              type="number"
              placeholder="Enter grams"
              value={customPortionSize}
              onChange={(e) => setCustomPortionSize(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e5ddd3] bg-[#fff9f3] px-4 py-1.5 text-sm text-[#1c1917] placeholder:text-[#a39d96] focus:outline-none focus:border-[#5c5553]"
            />
          )}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="field-label">Food type</legend>

          <div className="flex flex-wrap gap-2">
            {foodTypes.map((foodType) => (
              <button
                key={foodType}
                type="button"
                onClick={() =>
                  setSelectedFoodType(
                    selectedFoodType === "other" ? null : "other",
                  )
                }
                className={
                  selectedFoodType === "other"
                    ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm border border-transparent"
                    : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
                }
              >
                {foodType}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedFoodType("other")}
              className={
                selectedFoodType === "other"
                  ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm"
                  : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
              }
            >
              Other
            </button>
          </div>

          {selectedFoodType === "other" && (
            <input
              type="text"
              placeholder="Enter food type"
              value={customFoodType}
              onChange={(e) => setCustomFoodType(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e5ddd3] bg-[#fff9f3] px-4 py-1.5 text-sm text-[#1c1917] placeholder:text-[#a39d96] focus:outline-none focus:border-[#5c5553]"
            />
          )}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="field-label">Appetite</legend>
          <div className="flex flex-wrap gap-2">
            {appetiteOptions.map((appetiteOption) => (
              <button
                key={appetiteOption}
                type="button"
                onClick={() =>
                  setSelectedAppetite(
                    selectedAppetite === appetiteOption ? null : appetiteOption,
                  )
                }
                className={
                  selectedAppetite === appetiteOption
                    ? "bg-[#5c5553] text-white text-sm rounded-full px-3 py-1.5 font-medium shadow-sm border border-transparent"
                    : "bg-[#fff9f3] border border-[#e5ddd3] text-[#6b6560] text-sm rounded-full px-3 py-1.5 font-medium"
                }
              >
                {appetiteOption}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mb-4">
          <label htmlFor="notes" className="field-label">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            value={notes}
            placeholder="e.g. Drank lots of water, ate slowly"
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[#fff9f3] border border-[#e5ddd3] w-full rounded-2xl mt-2 px-4 py-2 text-sm text-[#1c1917] placeholder:text-[#a39d96] focus:outline-none focus:border-[#5c5553]"
          ></textarea>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-[#f9e4e0] border border-[#f0c9c2] text-[#b3564a] rounded-2xl px-4 py-3 text-sm mb-4">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          className="bg-[#5c5552] text-white hover:bg-[#4A4441] shadow-[#5C5552]/20 px-4 h-15 w-full rounded-3xl font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={
            !selectedPortionSize ||
            !selectedFoodType ||
            (selectedPortionSize === "other" && !customPortionSize) ||
            (selectedFoodType === "other" && !customFoodType)
          }
        >
          Save Feeding
        </button>

        {(!selectedPortionSize ||
          !selectedFoodType ||
          (selectedPortionSize === "other" && !customPortionSize) ||
          (selectedFoodType === "other" && !customFoodType)) && (
          <p className="text-xs text-muted text-center mt-2">
            Select a portion size and food type to save this feeding
          </p>
        )}
      </form>
    </section>
  );
}
