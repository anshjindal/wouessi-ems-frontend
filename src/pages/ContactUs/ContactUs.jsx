import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import wouessi from "../../assets/images/WouessiLoginPageImage2.jpg";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import "../../styles/pages/ContactUs.css";

const ContactUs = () => {
    return (
        <>
            <Header />
            <div className="container my-5">
                {/* Get in Touch Section */}
                <section className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <h1 className="fw-bold">Get in touch with us</h1>
                        <p className="lead">
                            We appreciate you taking the time to visit our website and learn more about Wouessi Inc.
                        </p>
                        <p><strong>Email us:</strong> <a href="mailto:info@wouessi.com" className="text-primary">info@wouessi.com</a></p>
                        <p><strong>Call us:</strong> <a href="tel:+18443172845" className="text-primary">+1 844 317 2845</a></p>
                    </div>
                    <div className="col-md-6">
                        <img src={wouessi} alt="Contact" className="img-fluid rounded" />
                    </div>
                </section>
                {/* Contact Form Section */}
                <section className="contact-form bg-light p-4 rounded shadow mb-5">
                    <h2 className="fw-bold text-center">We are excited to hear from you!</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Name" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Phone" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Subject" required />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control" placeholder="Message" rows="4" required></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn w-100 mt-3">Send your message →</button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Subscription Section */}
                <section className="subscription text-white text-center py-5 rounded shadow">
                    <div className="container">
                        <h2 className="fw-bold">Exclusive, be the first to know</h2>
                        <p>Enter your email to subscribe to our newsletter for our latest news, updates, and offers.</p>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input type="email" className="form-control" placeholder="Email" required />
                                    <button className="btn">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;