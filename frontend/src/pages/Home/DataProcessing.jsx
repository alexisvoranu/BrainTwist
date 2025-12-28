import React from "react";
import styled from "styled-components";
import { NavbarHome } from "../../Components/Client/Navbar";
import Footer from "../../Components/Footer";

const DataProcessing = () => {
  return (
    <Container>
      <NavbarHome />
      <HeroSection>
        <HeroContent>
          <h1>Prelucrarea Datelor cu Caracter Personal</h1>
          <p>
            Protejarea datelor tale personale este importantă pentru noi. În
            această pagină vei găsi toate informațiile necesare referitoare la
            cum prelucrăm datele tale și cum le protejăm.
          </p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <InfoCard>
          <h2>🔒 Protejarea Confidențialității</h2>
          <p>
            La magazinul nostru online, respectăm dreptul tău la
            confidențialitate și ne angajăm să protejăm informațiile tale
            personale. Prelucrarea datelor tale se face conform reglementărilor
            GDPR (Regulamentul General privind Protecția Datelor) și al altor
            legislații aplicabile, garantându-se transparența și securitatea
            proceselor noastre.
          </p>
          <p>
            În momentul în care efectuezi o comandă sau te înregistrezi pe
            platforma noastră, colectăm datele tale personale necesare pentru a
            procesa comanda și a-ți oferi servicii de calitate. Aceste date
            includ, dar nu se limitează la: nume, prenume, adresă de livrare,
            număr de telefon, adresă de email și informații referitoare la
            tranzacțiile efectuate.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>🔍 Ce date colectăm?</h2>
          <p>
            Colectăm informațiile necesare pentru a-ți furniza serviciile pe
            care le-ai solicitat. Printre datele colectate se numără:
            <ul>
              <li>
                Informații personale (nume, prenume, adresă de livrare, email,
                număr de telefon)
              </li>
              <li>
                Informații de plată (detalii despre tranzacțiile efectuate pe
                platforma noastră)
              </li>
              <li>
                Informații de navigare pe site (adică istoricul navigării tale
                pe site-ul nostru, pentru a îmbunătăți experiența
                utilizatorului)
              </li>
            </ul>
          </p>
          <p>
            În plus, putem colecta și informații non-personale, precum datele
            despre dispozitivul utilizat pentru accesarea site-ului, precum
            tipul de browser sau IP-ul, pentru a îmbunătăți funcționalitatea
            site-ului și a oferi servicii personalizate.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>📅 Scopurile prelucrării datelor</h2>
          <p>
            Datele tale personale sunt prelucrate în scopuri specifice,
            inclusiv:
            <ul>
              <li>
                Procesarea comenzilor tale (livrare, facturare, gestionarea
                stocurilor)
              </li>
              <li>
                Oferirea unui suport eficient în cazul întrebărilor sau
                problemelor legate de produse sau comenzi
              </li>
              <li>
                Îmbunătățirea experienței tale de utilizator pe site-ul nostru
              </li>
              <li>
                Promovarea unor oferte și reduceri personalizate, dacă ai
                consimțit în acest sens
              </li>
            </ul>
          </p>
          <p>
            Nu vom prelucra datele tale în alte scopuri decât cele specificate
            în această politică, iar dacă vom modifica scopurile de prelucrare,
            îți vom solicita acordul în prealabil.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>🛡️ Drepturile tale</h2>
          <p>
            În conformitate cu legislația în vigoare privind protecția datelor,
            ai mai multe drepturi importante legate de prelucrarea datelor tale
            personale:
            <ul>
              <li>
                <strong>Dreptul de acces</strong> – ai dreptul de a solicita
                informații despre datele tale personale pe care le prelucrăm.
              </li>
              <li>
                <strong>Dreptul de rectificare</strong> – ai dreptul de a
                solicita corectarea datelor tale personale dacă acestea sunt
                inexacte sau incomplete.
              </li>
              <li>
                <strong>Dreptul de ștergere</strong> – ai dreptul de a solicita
                ștergerea datelor tale personale în anumite condiții (de
                exemplu, dacă nu mai sunt necesare pentru scopurile pentru care
                au fost colectate).
              </li>
              <li>
                <strong>Dreptul de a obiecta</strong> – ai dreptul de a obiecta
                la prelucrarea datelor tale în scopuri de marketing direct.
              </li>
              <li>
                <strong>Dreptul la portabilitatea datelor</strong> – ai dreptul
                de a solicita să primești datele tale personale într-un format
                structurat, utilizat în mod curent, și să le transferi către un
                alt operator.
              </li>
            </ul>
          </p>
          <p>
            Dacă dorești să îți exerciti oricare dintre aceste drepturi, te
            rugăm să ne contactezi folosind datele de contact furnizate mai jos.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>📞 Contact</h2>
          <p>
            Pentru orice întrebări sau nelămuriri referitoare la prelucrarea
            datelor tale cu caracter personal, sau pentru a-ți exercita
            drepturile conform legislației în vigoare, te rugăm să ne contactezi
            la adresa de email: <strong>ax.isvoranu@gmail.com</strong> sau la
            numărul de telefon <strong>+40 720 055 759</strong>.
          </p>
          <p>
            Ne angajăm să răspundem solicitărilor tale într-un termen de 30 de
            zile, în conformitate cu reglementările legale.
          </p>
        </InfoCard>
      </ContentSection>

      <div className="mt-5">
        <Footer />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HeroSection = styled.section`
  background-color: #4a4a4a;
  color: white;
  padding: 60px 120px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const InfoCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 30px;
  width: 60%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 90%;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
  }
`;

export default DataProcessing;
