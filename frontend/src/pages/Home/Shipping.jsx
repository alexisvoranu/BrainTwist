import React from "react";
import styled from "styled-components";
import { NavbarHome } from "../../Components/Client/Navbar";
import Footer from "../../Components/Footer";

const TransportPage = () => {

  return (
    <TransportContainer>
      <NavbarHome />
      <HeroSection>
        <HeroContent>
          <h1>Modalități de livrare și plată</h1>
          <p>
            Descoperă opțiunile noastre de transport pentru a primi produsele
            preferate direct acasă! Alege tipul de plată care ți se potrivește.
          </p>
          <h5>
            La cumpărături de peste <b>250 de lei</b> beneficiați de transport
            gratuit 🚚
          </h5>
        </HeroContent>
      </HeroSection>

      <Section>
        <h2>Modalități de Livrare</h2>
        <CardsContainer>
          <TransportCard>
            <img src="./Sameday.jpg" alt="Livrare Sameday" />
            <Description>
              <h2>Livrare Sameday</h2>
              <p>
                Optează pentru livrarea în aceeași zi cu Sameday! Comandă până
                în ora 14:00 și primești produsul acasă mâine.
              </p>
              <p>
                <strong>Cost: 21.99 Lei</strong>
              </p>
            </Description>
          </TransportCard>

          <TransportCard>
            <img src="./Cargus.jpg" alt="Livrare Cargus" />
            <Description>
              <h2>Livrare Cargus</h2>
              <p>
                Livrare prin Cargus, cu termen de livrare de 2-3 zile
                lucrătoare.
              </p>
              <br></br>
              <p>
                <strong>Cost: 17.99 Lei</strong>
              </p>
            </Description>
          </TransportCard>

          <TransportCard>
            <img src="./FAN.jpg" alt="Livrare FanCourier" />
            <Description>
              <h2>Livrare FanCourier</h2>
              <p>
                Livrare prin FanCourier, cu un termen de livrare estimat între 2
                și 4 zile lucrătoare.
              </p>
              <br></br>
              <p>
                <strong>Cost: 19.99 Lei</strong>
              </p>
            </Description>
          </TransportCard>
        </CardsContainer>
      </Section>

      <Section>
        <h2>Modalități de Plată</h2>
        <CardsContainer>
          <PaymentCard>
            <img src="./Visa-Mastercard.png" alt="Visa" />
            <Description>
              <h2>Online, cu cardul</h2>
              <p>
                Plătește rapid și în siguranță folosind cardul tău Visa sau
                Mastercard.
              </p>
            </Description>
          </PaymentCard>

          <PaymentCard>
            <img src="./Stripe.jpg" alt="Stripe" />
            <Description>
              <h2>Stripe</h2>
              <p>
                Utilizează Stripe pentru plăți online rapide și fără probleme.
              </p>
            </Description>
          </PaymentCard>

          <PaymentCard>
            <img src="./Cash.jpg" alt="Plata la livrare" />
            <Description>
              <h2>La livrare</h2>
              <p>Plătește numerar sau cu cardul direct la livrare.</p>
            </Description>
          </PaymentCard>
        </CardsContainer>
      </Section>
      <Footer />
    </TransportContainer>
  );
};

const TransportContainer = styled.div`
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
    margin-bottom: 40px;
  }
  p {
    font-size: 1.2rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 80%;
  margin: auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const TransportCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  transform: scale(0.9);
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const Section = styled.section`
  text-align: center;
  margin-top: 40px;
  h2 {
    margin-bottom: 40px;
  }
  margin-bottom: 50px;
`;

const Description = styled.div`
  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
  }
`;

const PaymentCard = styled(TransportCard)``;

export default TransportPage;
