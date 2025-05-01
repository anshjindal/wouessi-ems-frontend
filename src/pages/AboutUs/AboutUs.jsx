import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import "../../styles/pages/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <Header />
      <main role="main" aria-label="About Wouessi page">
        <div
          className="about-page container my-5 text-center"
          aria-describedby="about-description"
        >
          <p id="about-description" className="visually-hidden">
            This section contains an embedded page about the company Wouessi.
          </p>
          <iframe
            src="https://www.wouessi.com/en/AboutUs"
            className="about-iframe"
            title="About Wouessi"
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
