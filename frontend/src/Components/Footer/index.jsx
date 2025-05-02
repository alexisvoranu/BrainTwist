import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.firstSection}>
          <h3>Despre noi</h3>
          <p>
            BrainTwist s-a născut în martie 2025 dintr-o pasiune profundă pentru
            puzzle-uri și din dorința de a oferi iubitorilor de provocări
            intelectuale un spațiu unde să-și exploreze și să-și dezvolte
            abilitățile logice, gândiriea strategică și creativitatea.
          </p>
        </div>
        <div style={styles.section}>
          <h3>BrainTwist</h3>
          <ul style={styles.list}>
            <li>
              <Link to="/" style={styles.link} onClick={() => window.scrollTo(0, 0)}>
                Acasă
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" style={styles.link} onClick={() => window.scrollTo(0, 0)}>
                Despre noi
              </Link>
            </li>
            <li>
              <Link to="/shipping" style={styles.link} onClick={() => window.scrollTo(0, 0)}>
                Livrare și plată
              </Link>
            </li>
            <li>
              <Link to="/return" style={styles.link} onClick={() => window.scrollTo(0, 0)}>
                Retur și garanție
              </Link>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Link-uri utile</h3>
          <ul style={styles.list}>
            <li>
              <Link to="/dataProcessing" style={styles.link} onClick={() => window.scrollTo(0, 0)}>
                Prelucrarea datelor cu caracter personal
              </Link>
            </li>
            <li />
            <li>
              <Link
                to="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Soluționarea litigiilor
              </Link>
            </li>
            <li>
              <Link
                to="https://www.anpc.gov.ro"
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                PROTECȚIA CONSUMATORILOR – A.N.P.C.
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.section}>
          <h3>Contact</h3>
          <p className="mb-2">Email: ax.isvoranu@gmail.com</p>
          <p className="mb-2">Telefon: +40 720 055 759</p>
          <p className="mb-2">Adresă: Strada Frumoasă, Nr. 1, București</p>
        </div>
      </div>
      <div style={styles.bottomBar}>
        &copy; {new Date().getFullYear()} BrainTwist - Toate drepturile
        rezervate
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "8%",
    backgroundColor: "#222",
    color: "#fff",
    padding: "30px 10px",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "90%",
    margin: "0 auto",
  },
  section: {
    flex: "1 1 200px",
    margin: "10px 20px",
    textAlign: "left",
  },
  firstSection: {
    flex: "2 1 400px",
    margin: "10px 40px 10px 10px",
    textAlign: "justify",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#bbb",
    textDecoration: "none",
    display: "block",
    margin: "5px 0",
  },
  bottomBar: {
    borderTop: "1px solid #444",
    paddingTop: "10px",
    fontSize: "14px",
  },
};

export default Footer;
