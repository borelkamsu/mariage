import { RsvpForm } from "@/components/RsvpForm";

export default function Home() {
  return (
    <main className="guest-page">
      <div className="botanical botanical-left" />
      <div className="botanical botanical-right" />
      <section className="invitation-card">
        <div className="monogram">Q <span>&</span> C</div>
        <p className="eyebrow">Mariage traditionnel</p>
        <h1>Votre présence<br />est notre plus beau cadeau</h1>
        <div className="ornament"><span>✦</span></div>
        <div className="intro">
          <p>
            Bonjour à tous,
          </p>
          <p>
            Afin de finaliser l’organisation du mariage dans les meilleures
            conditions, merci de bien vouloir confirmer votre présence dès que
            possible.
          </p>
          <p>
            Si vous serez accompagné(e), merci d’indiquer également le nom et
            prénom de chaque personne qui vous accompagnera (conjoint(e), amis,
            proches, etc.).
          </p>
          <p>
            Votre retour rapide nous aidera grandement dans la préparation de
            cet heureux événement.
          </p>
          <p className="intro-closing">
            Merci à tous et au plaisir de partager ce moment avec vous ! 🎉💍
          </p>
        </div>
        <RsvpForm />
      </section>
    </main>
  );
}
