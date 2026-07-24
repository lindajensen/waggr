"use client";

import { X, TreeDeciduous } from "lucide-react";

interface LogWalkModalProps {
  onClose: () => void;
}

export default function LogWalkModal({ onClose }: LogWalkModalProps) {
  return (
    <article>
      <header>
        <div>
          <TreeDeciduous />
        </div>

        <div>
          <h1>Log Walk</h1>
          <p>Undertext</p>
        </div>

        <div>
          <X />
        </div>
      </header>

      <div></div>

      {/* <form action={addWalk}></form> */}
      <form>
        <fieldset>
          <legend>Duration (minutes)</legend>
          <button type="button">10m</button>
          <button type="button">15m</button>
          <button type="button">20m</button>
          <button type="button">30m</button>
          <button type="button">45m</button>
          <button type="button">Other</button>
        </fieldset>

        <fieldset>
          <legend>Potty Break</legend>
          <button type="button">Pee</button>
          <button type="button">Poop</button>
        </fieldset>

        <label htmlFor="notes">Notes (optional)</label>
        <textarea name="notes" id="notes"></textarea>

        <fieldset>
          <legend>Quick Notes</legend>
          <button type="button">High energy</button>
          <button type="button">Calm walk</button>
          <button type="button">Met other dogs</button>
          <button type="button">Met new people</button>
          <button type="button">Good leash walking</button>
          <button type="button">Good leash walking</button>
          <button type="button">Pulled on leash</button>
          <button type="button">Recall practice</button>
          <button type="button">Park/forrest walk</button>
          <button type="button">New route</button>
        </fieldset>

        <button type="submit">Save Walk</button>
      </form>
    </article>
  );
}
