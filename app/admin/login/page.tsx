import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (isValidAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <div className="login-card">
        <div className="monogram small">Q <span>&</span> C</div>
        <p className="eyebrow">Espace privé</p>
        <h1>Tableau de bord</h1>
        <p>Connectez-vous pour consulter les réponses de vos invités.</p>
        <AdminLogin />
      </div>
    </main>
  );
}
