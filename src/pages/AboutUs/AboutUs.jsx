import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import "../../styles/pages/AboutUs.css";

const AboutUs = () => {
    return (
        <>
            <Header />
            <div className="about-page container my-5 text-center">
                <iframe 
                    src="https://www.wouessi.com/en/AboutUs"
                    className="about-iframe"
                    title="About Wouessi"
                />
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
