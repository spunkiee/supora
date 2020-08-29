import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer-container footer-signup-media-query activation-footer">
        <div className="combined">
          <div className="services-link">
            <Link to="/">
              <span className="servises-item">Home</span>
            </Link>
            <Link to="/about-us">
              <span className="servises-item">About</span>
            </Link>
            <Link to="/contact">
              <span className="servises-item">Contact</span>
            </Link>
            <Link to="/support">
              <span className="servises-item">Support</span>
            </Link>
          </div>
          <div className="social-media">
            <div>Follow us on : </div>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <LinkedInIcon style={{ color: "#bcccdd", cursor: "pointer" }} />
              </span>
            </a>
            <a
              href="https://www.github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <GitHubIcon style={{ color: "#bcccdd", cursor: "pointer" }} />
              </span>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <InstagramIcon
                  style={{ color: "#bcccdd", cursor: "pointer" }}
                />
              </span>
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <FacebookIcon style={{ color: "#bcccdd", cursor: "pointer" }} />
              </span>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <TwitterIcon style={{ color: "#bcccdd", cursor: "pointer" }} />
              </span>
            </a>
          </div>
        </div>
        <div className="line"></div>
        <div className="right-reserved">
          <span>All right reserved © 2020</span>
          <span>
            Developed by :{" "}
            <span className="name-footer">Ramashish Katiyar</span>
          </span>
        </div>
      </div>
    </>
  );
}
