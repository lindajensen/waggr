"use server";

import sql from "@/lib/db";

export async function addWalk(formData: FormData) {
  const duration = formData.get("duration");
  const notes = formData.get("notes");
  const pottyBreaksRaw = formData.get("pottyBreaks");
  const quickNotesRaw = formData.get("quickNotes");

  if (
    typeof duration !== "string" ||
    typeof notes !== "string" ||
    typeof pottyBreaksRaw !== "string" ||
    typeof quickNotesRaw !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  const parsedPottyBreaks = JSON.parse(pottyBreaksRaw);
  const parsedQuickNotes = JSON.parse(quickNotesRaw);

  await sql`
    INSERT INTO walks (duration, notes, Potty_breaks, quick_notes)
    VALUES (${Number(duration)}, ${notes}, ${parsedPottyBreaks}, ${parsedQuickNotes})
  `;
}
