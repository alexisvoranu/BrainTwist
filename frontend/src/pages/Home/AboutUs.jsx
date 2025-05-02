import React from "react";
import styled from "styled-components";
import { NavbarHome } from "../../Components/Client/Navbar";
import Footer from "../../Components/Footer";

const AboutUs = () => {
  return (
    <AboutContainer>
      <NavbarHome />
      <HeroSection>
        <h1>Despre BrainTwist</h1>
        <p>
          BrainTwist nu este doar un magazin, ci un univers dedicat pasionaților
          de puzzle-uri!
        </p>
      </HeroSection>

      <ContentSection>
        <h2>Povestea Noastră</h2>
        <p>
          BrainTwist s-a născut în martie 2025 dintr-o pasiune profundă pentru
          puzzle-uri și din dorința de a oferi iubitorilor de provocări
          intelectuale un spațiu unde să-și exploreze și să-și dezvolte
          abilitățile logice. Ideea acestui proiect a prins contur din
          convingerea că puzzle-urile nu sunt doar o distracție, ci și un
          instrument valoros pentru stimularea gândirii strategice și a
          creativității. Ne dorim să creăm o comunitate vibrantă unde pasionații
          de puzzle-uri pot învăța, se pot inspira și pot descoperi mereu noi
          provocări captivante.
        </p>

        <h2>Misiunea Noastră</h2>
        <p>
          Scopul nostru este să aducem în fața clienților o gamă diversificată
          de puzzle-uri, de la clasicele Jigsaw, la cuburi Rubik, puzzle-uri IQ
          și mecanice, potrivite pentru toate vârstele și nivelurile de
          dificultate. Vrem să încurajăm gândirea analitică, răbdarea și
          perseverența, oferind produse de calitate, menite să provoace și să
          inspire utilizatorii.
        </p>

        <h2>De Ce BrainTwist?</h2>
        <ul>
          <li>
            🔹 Selecție atentă de produse, provenite de la branduri de renume
            mondial.
          </li>
          <li>
            🚀 Livrare rapidă și diverse opțiuni de plată pentru confort maxim.
          </li>
          <li>
            🎁 Recompense speciale pentru clienții fideli și reduceri exclusive.
          </li>
          <li>
            🌍 Promovăm educația prin joc și susținem dezvoltarea gândirii
            logice.
          </li>
        </ul>

        <h2>Valorile Noastre</h2>
        <p>
          La BrainTwist, ne ghidăm după trei principii fundamentale: calitate,
          inovație și comunitate. Credem că fiecare puzzle spune o poveste și
          oferă o provocare unică. Ne dorim să inspirăm oamenii să exploreze, să
          își depășească limitele și să se bucure de satisfacția de a rezolva
          enigme. Susținem ideea că învățarea și distracția pot merge mână în
          mână, contribuind la dezvoltarea unei gândiri mai clare și mai
          structurate.
        </p>

        <h2>Contact</h2>
        <p>
          <strong>Email:</strong> ax.isvoranu@gmail.com
        </p>
        <p>
          <strong>Telefon:</strong> +40 720 055 759
        </p>
        <p>
          <strong>Adresă:</strong> Strada Frumoasă, Nr. 1, București
        </p>
      </ContentSection>

      <Footer />
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HeroSection = styled.section`
  background-color: #4a4a4a;
  color: white;
  text-align: center;
  padding: 60px 20px;
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.2rem;
    text-align: center
  }
`;

const ContentSection = styled.section`
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px;
  text-align: left;
  
  h2 {
    color: #02af74;
    margin-bottom: 15px;
    margin-top: 30px;
  }
  p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.5;
    text-align: justify
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }
`;

export default AboutUs;
