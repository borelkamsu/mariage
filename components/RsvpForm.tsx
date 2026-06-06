"use client";

import { FormEvent, useState } from "react";
import { Check, ChevronDown, LoaderCircle, UsersRound } from "lucide-react";

type Attendance = "yes" | "";
type Accompanied = "yes" | "no" | "";

export function RsvpForm() {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<Attendance>("");
  const [accompanied, setAccompanied] = useState<Accompanied>("");
  const [count, setCount] = useState(1);
  const [companions, setCompanions] = useState<string[]>([""]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateCount(next: number) {
    const safeCount = Math.min(Math.max(next || 1, 1), 10);
    setCount(safeCount);
    setCompanions((current) =>
      Array.from({ length: safeCount }, (_, index) => current[index] || "")
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const submittedCompanions =
      attending === "yes" && accompanied === "yes" ? companions : [];

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          attending: attending === "yes",
          companions: submittedCompanions,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Une erreur est survenue.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="success-card" role="status">
        <div className="success-icon"><Check size={28} /></div>
        <h2>Merci, {guestName.trim()} !</h2>
        <p>
          Votre présence a bien été enregistrée. Nous avons hâte de célébrer
          avec vous.
        </p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={submit}>
      <label className="field">
        <span>Votre nom complet</span>
        <input
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder="Ex. Marie Dupont"
          autoComplete="name"
          required
          maxLength={120}
        />
      </label>

      <fieldset>
        <legend>Confirmez-vous votre présence ?</legend>
        <div className="choice-grid single-choice">
          <Choice
            label="Oui, avec joie"
            selected={attending === "yes"}
            onClick={() => setAttending("yes")}
          />
        </div>
      </fieldset>

      {attending === "yes" && (
        <fieldset className="reveal">
          <legend>Vous venez accompagné(e) ?</legend>
          <div className="choice-grid">
            <Choice
              label="Oui"
              selected={accompanied === "yes"}
              onClick={() => setAccompanied("yes")}
            />
            <Choice
              label="Non"
              selected={accompanied === "no"}
              onClick={() => setAccompanied("no")}
            />
          </div>
        </fieldset>
      )}

      {attending === "yes" && accompanied === "yes" && (
        <div className="companion-section reveal">
          <label className="field">
            <span>Nombre d’accompagnateurs</span>
            <div className="select-wrap">
              <UsersRound size={18} />
              <select value={count} onChange={(event) => updateCount(Number(event.target.value))}>
                {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "personne" : "personnes"}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} />
            </div>
          </label>

          <div className="companion-list">
            {companions.map((name, index) => (
              <label className="field companion-field" key={index}>
                <span>Nom de l’accompagnateur {index + 1}</span>
                <input
                  value={name}
                  onChange={(event) => {
                    const next = [...companions];
                    next[index] = event.target.value;
                    setCompanions(next);
                  }}
                  placeholder={`Accompagnateur ${index + 1}`}
                  required
                  maxLength={120}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {message && <p className="form-error">{message}</p>}
      <button className="submit-button" disabled={!guestName || !attending || status === "loading"}>
        {status === "loading" ? <LoaderCircle className="spin" size={20} /> : null}
        {status === "loading" ? "Enregistrement..." : "Envoyer ma réponse"}
      </button>
      <p className="privacy-note">Vos informations sont uniquement utilisées pour organiser le mariage.</p>
    </form>
  );
}

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`choice ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="radio-dot">{selected && <span />}</span>
      {label}
    </button>
  );
}
