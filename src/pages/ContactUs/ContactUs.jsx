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
      <main role="main" aria-label="Contact Us Page">
        <div className="container my-5">
          {/* Get in Touch Section */}
          <section
            className="row align-items-center mb-5"
            aria-labelledby="contact-heading"
          >
            <div className="col-md-6">
              <h1 id="contact-heading" className="fw-bold">
                Get in touch with us
              </h1>
              <p className="lead">
                We appreciate you taking the time to visit our website and learn
                more about Wouessi Inc.
              </p>
              <p>
                <strong>Email us:</strong>{" "}
                <a href="mailto:info@wouessi.com" className="text-primary">
                  info@wouessi.com
                </a>
              </p>
              <p>
                <strong>Call us:</strong>{" "}
                <a href="tel:+18443172845" className="text-primary">
                  +1 844 317 2845
                </a>
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={wouessi}
                alt="Wouessi Contact Illustration"
                className="img-fluid rounded"
              />
            </div>
          </section>

          {/* Contact Form Section */}
          <section
            className="contact-form bg-light p-4 rounded shadow mb-5"
            aria-labelledby="form-heading"
          >
            <h2 id="form-heading" className="fw-bold text-center">
              We are excited to hear from you!
            </h2>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="contact-name"
                        className="form-label visually-hidden"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="contact-email"
                        className="form-label visually-hidden"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        className="form-control"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="contact-phone"
                        className="form-label visually-hidden"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="contact-phone"
                        className="form-control"
                        placeholder="Phone"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="contact-subject"
                        className="form-label visually-hidden"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        className="form-control"
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="contact-message"
                        className="form-label visually-hidden"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        className="form-control"
                        placeholder="Message"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 mt-3"
                    aria-label="Send your message"
                  >
                    Send your message →
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Subscription Section */}
          <section
            className="subscription text-white text-center py-5 rounded shadow"
            aria-labelledby="subscription-heading"
          >
            <div className="container">
              <h2 id="subscription-heading" className="fw-bold">
                Exclusive, be the first to know
              </h2>
              <p>
                Enter your email to subscribe to our newsletter for our latest
                news, updates, and offers.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <label
                      htmlFor="subscribe-email"
                      className="form-label visually-hidden"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="subscribe-email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                    <button
                      className="btn"
                      aria-label="Subscribe to newsletter"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
