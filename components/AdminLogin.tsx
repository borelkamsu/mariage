"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <label className="field">
        <span>Mot de passe</span>
        <div className="password-wrap">
          <LockKeyhole size={18} />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Votre mot de passe"
            required
          />
        </div>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="submit-button" disabled={loading}>
        {loading && <LoaderCircle className="spin" size={20} />}
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
