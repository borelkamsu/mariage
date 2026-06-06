"use client";

import { CalendarCheck, LogOut, UserCheck, UserRoundX, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";

type RsvpResponse = {
  id: string;
  guestName: string;
  attending: boolean;
  companions: string[];
  createdAt: string;
};

export function AdminDashboard({ responses }: { responses: RsvpResponse[] }) {
  const router = useRouter();
  const accepted = responses.filter((response) => response.attending);
  const declined = responses.filter((response) => !response.attending);
  const companionCount = accepted.reduce((sum, response) => sum + response.companions.length, 0);
  const totalPresent = accepted.length + companionCount;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <div className="monogram small">Q <span>&</span> C</div>
          <p>Tableau de bord des réponses</p>
        </div>
        <button className="logout-button" onClick={logout}><LogOut size={17} /> Déconnexion</button>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-title">
          <div>
            <p className="eyebrow">Vue d’ensemble</p>
            <h1>Vos invités</h1>
          </div>
          <p className="updated">Mis à jour à chaque ouverture</p>
        </div>

        <div className="stats-grid">
          <Stat icon={<UsersRound />} label="Personnes présentes" value={totalPresent} tone="gold" />
          <Stat icon={<UserCheck />} label="Invités principaux" value={accepted.length} tone="green" />
          <Stat icon={<CalendarCheck />} label="Accompagnateurs" value={companionCount} tone="blue" />
          <Stat icon={<UserRoundX />} label="Absents" value={declined.length} tone="rose" />
        </div>

        <section className="responses-panel">
          <div className="panel-heading">
            <div>
              <h2>Liste des réponses</h2>
              <p>{responses.length} réponse{responses.length !== 1 ? "s" : ""} reçue{responses.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {responses.length === 0 ? (
            <div className="empty-state">
              <UsersRound size={32} />
              <h3>Aucune réponse pour le moment</h3>
              <p>Les confirmations apparaîtront ici dès qu’un invité aura rempli le formulaire.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Invité</th>
                    <th>Réponse</th>
                    <th>Accompagnateurs</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response) => (
                    <tr key={response.id}>
                      <td><strong>{response.guestName}</strong></td>
                      <td>
                        <span className={`status-badge ${response.attending ? "yes" : "no"}`}>
                          {response.attending ? "Présent(e)" : "Absent(e)"}
                        </span>
                      </td>
                      <td>
                        {response.companions.length ? (
                          <div className="companion-names">
                            {response.companions.map((name) => <span key={name}>{name}</span>)}
                          </div>
                        ) : <span className="muted">Aucun</span>}
                      </td>
                      <td><span className="total-pill">{response.attending ? 1 + response.companions.length : 0}</span></td>
                      <td className="muted">{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(response.createdAt))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: string }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div><strong>{value}</strong><span>{label}</span></div>
    </article>
  );
}
