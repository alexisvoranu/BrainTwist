import React from "react";
import styled from "styled-components";
import { NavbarHome } from "../../Components/Client/Navbar";
import Footer from "../../Components/Footer";

const HomePage = () => {

  return (
    <HomeContainer>
      <NavbarHome />
      <HeroSection>
        <HeroContent>
          <h1>Bine ai venit pe pagina BrainTwist!</h1>
          <p>
            Găsește puzzle-ul perfect pentru tine! Puzzle-uri clasice, cuburi
            Rubik și puzzle-uri de IQ. Alege provocarea ideală!
          </p>
          <h6>La achiziția unui set complet&nbsp;<b>(Puzzle + Rubik + IQ)</b>
          &nbsp;beneficiați de 20% reducere 🥳</h6>
          <h6 className="mt-3">La cumpărături de peste <b>250 de lei</b> beneficiați de transport gratuit 🚚</h6>
        </HeroContent>
      </HeroSection>

      <div
        className="benefits-section"
        style={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        <h2>Beneficiile unui cont BrainTwist</h2>
        <p>
          <strong>🎉 La a 3-a comandă:</strong> Transport gratuit!
        </p>
        <p>
          <strong>🎁 La a 5-a comandă:</strong> Voucher 25% reducere la
          următoarea comandă!
        </p>
        <p>
          <strong>💎 La a 10-a comandă:</strong> Reducere de 40% direct aplicată
          în coș!
        </p>
        <p>
          <a href="/register">Înscrie-te acum</a> și bucură-te de recompense
          exclusive!
        </p>
      </div>

      <ProductDescription>
        <ProductCard>
          <ImageContainer>
            <img
              src="./Pont Alexandre, Paris.jpg"
              width={300}
              height={200}
              alt="Pont Alexandre, Paris"
            />
          </ImageContainer>
          <Description>
            <h2>Puzzle-uri clasice (Jigsaw)</h2>
            <p>
              Un puzzle clasic, perfect pentru iubitorii de provocări logice și
              momente de relaxare. Fiecare piesă este atent realizată pentru a
              se îmbina perfect, oferind o experiență captivantă și
              satisfăcătoare. Indiferent de dimensiune sau complexitate, acest
              puzzle stimulează răbdarea, atenția la detalii și spiritul de
              observație, transformând fiecare asamblare într-o aventură plină
              de satisfacție.
            </p>
            <a style={{ color: "#02af74" }} href="/client/Jigsaw">
              Descoperă toate produsele
            </a>
          </Description>
        </ProductCard>

        <ProductCard>
          <img
            src="./GAN 11 Pro 3x3 5.jpg"
            width={300}
            height={200}
            alt="GAN 11 Pro 3x3"
          />
          <Description>
            <h2>Rubik's</h2>
            <p>
              Un cub Rubik este o provocare fascinantă pentru minte, testând
              gândirea logică, memoria și dexteritatea. Cu mecanisme fluide și o
              varietate de soluții, fiecare model oferă o experiență unică, fie
              că este vorba despre variantele clasice sau cele mai complexe.
              Perfect pentru pasionații de puzzle-uri, acest tip de provocare
              îți pune abilitățile de rezolvare la încercare și îți oferă
              satisfacția de a găsi combinația perfectă.
            </p>
            <a style={{ color: "#02af74" }} href="/client/Rubik">
              Descoperă toate produsele
            </a>
          </Description>
        </ProductCard>

        <ProductCard>
          <img
            src="./Puzzle 3D Cutie cu flori 5.jpg"
            height={200}
            width={300}
            alt="Puzzle 3D Cutie cu flori"
          />
          <Description>
            <h2>IQ Puzzles</h2>
            <p>
              Îmbunătățește-ți abilitățile logice și gândirea spațială cu un
              puzzle 3D captivant, conceput pentru a testa răbdarea și
              creativitatea. Fiecare piesă se îmbină strategic, oferind o
              experiență interactivă și educativă. Indiferent de complexitate,
              aceste puzzle-uri reprezintă o provocare de IQ ideală pentru
              adevărații entuziaști ai jocurilor de logică și construcție.
            </p>
            <a style={{ color: "#02af74" }} href="/client/IQ">
              Descoperă toate produsele
            </a>
          </Description>
        </ProductCard>
      </ProductDescription>

      <div className="mt-5">
        <Footer />
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HeroSection = styled.section`
  background-color: #4a4a4a;
  color: white;
  padding: 60px 20px;
  text-align: center;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const ShopNowButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #f79c42;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f57c00;
  }
`;

const ProductDescription = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  `;

  const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 30px;
  width: 80%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;
const ImageContainer = styled.div`
  width: 300px;
  height: auto;
  img {
    border: 4px solid #ddd;
    border-radius: 10px;
  }
`;

const Description = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    text-align: justify;
  }
`;

const media = {
  tablet: "@media (max-width: 768px)",
  mobile: "@media (max-width: 480px)",
};

const ResponsiveProductCard = styled(ProductCard)`
  ${media.tablet} {
    width: 90%;
    margin-bottom: 20px;
  }

  ${media.mobile} {
    width: 95%;
  }
`;

const ResponsiveHeroSection = styled(HeroSection)`
  ${media.tablet} {
    padding: 40px 10px;
  }

  ${media.mobile} {
    padding: 30px 10px;
  }
`;

export default HomePage;
