import React from "react";
import styled from "styled-components";
import { NavbarHome } from "../../Components/Client/Navbar";
import Footer from "../../Components/Footer";

const Return = () => {
  return (
    <Container>
      <NavbarHome />
      <HeroSection>
        <HeroContent>
          <h1>Retur și Garanție</h1>
          <p>
            La magazinul nostru, ne dorim să oferim clienților o experiență de
            cumpărare cât mai sigură și fără griji. De aceea, toate produsele
            noastre sunt acoperite de o garanție de <strong>24 de luni</strong>,
            iar dacă nu ești mulțumit de un produs, ai la dispoziție{" "}
            <strong>14 zile</strong> pentru a-l returna. Descoperă mai jos
            detalii importante despre garanție și retur.
          </p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <InfoCard>
          <h2>✅ Garanție 24 de luni</h2>
          <p>
            Toate produsele achiziționate de pe site-ul nostru beneficiază de o
            garanție de <strong>24 de luni</strong>, conform legislației în
            vigoare. Aceasta acoperă defectele de fabricație sau eventualele
            probleme apărute în condiții normale de utilizare. În cazul în care
            întâmpini dificultăți cu produsul tău în această perioadă, te rugăm
            să ne contactezi pentru a găsi cea mai bună soluție.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>📦 Retur în 14 zile</h2>
          <p>
            În cazul în care produsul comandat nu corespunde așteptărilor tale
            sau pur și simplu te-ai răzgândit, poți returna produsul în termen
            de <strong>14 zile calendaristice</strong> de la primirea acestuia.
            Condiția principală este ca produsul să fie returnat în aceeași
            stare în care a fost primit, fără urme de utilizare și în ambalajul
            original. Nu este necesară oferirea unui motiv pentru retur, iar noi
            îți vom restitui banii în cel mai scurt timp posibil.
          </p>
        </InfoCard>

        <InfoCard>
          <h2>📞 Procedura de Retur și Garanție</h2>
          <p>
            Pentru a facilita procesul de retur sau garanție, toate solicitările
            trebuie realizate prin apel telefonic la numărul{" "}
            <strong>+40 720 055 759</strong>. Echipa noastră de suport îți va
            oferi toate informațiile necesare, inclusiv detalii despre
            expedierea produsului și pașii următori.
          </p>
          <p>
            Îți mulțumim că ai ales magazinul nostru! Ne angajăm să soluționăm
            cererea ta cât mai rapid, pentru a-ți oferi o experiență cât mai
            plăcută. 😊
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
  padding: 40px 120px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 50px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
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
  width: 70%;
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

export default Return;
