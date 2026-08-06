"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

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
    INSERT INTO walks (duration, notes, potty_breaks, quick_notes)
    VALUES (${Number(duration)}, ${notes}, ${parsedPottyBreaks}, ${parsedQuickNotes})
  `;

  revalidatePath("/");
}

export async function addFeeding(formData: FormData) {
  const portionSize = formData.get("portionSize");
  const foodType = formData.get("foodType");
  const appetite = formData.get("appetite");
  const notes = formData.get("notes");

  if (
    typeof portionSize !== "string" ||
    typeof foodType !== "string" ||
    typeof appetite !== "string" ||
    typeof notes !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await sql`
    INSERT INTO feedings (portion_size, food_type, appetite, notes)
    VALUES (${Number(portionSize)}, ${foodType}, ${appetite}, ${notes})
  `;

  revalidatePath("/");
}
