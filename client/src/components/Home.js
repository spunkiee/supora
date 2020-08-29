import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";
import Footer from "./Footer";
import image1 from "../assets/1st.jpg";
import image2 from "../assets/2nd.jpg";
import image3 from "../assets/3rd.jpg";
import image4 from "../assets/4th.jpg";
import laptopImage from "../assets/laptop.svg";
import heartImage from "../assets/heart.svg";
import diamondImage from "../assets/diamond.svg";
import settingImage from "../assets/settings.svg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          height="650"
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height="650"
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height="650"
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height="650"
          className="d-block w-100"
          src={image4}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-heading">
          <div className="about-main-heading">ABOUT THE COMPANY</div>
          <div className="about-sub-heading">Key features of our company</div>
        </div>
        <div className="about-card-container">
          <div className="card">
            <div className="card-img">
              <img src={laptopImage} alt="" />
            </div>
            <div className="card-heading">Responsive</div>
            <div className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={heartImage} alt="" />
            </div>
            <div className="card-heading">Passion</div>
            <div className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={diamondImage} alt="" />
            </div>
            <div className="card-heading">Design</div>
            <div className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={settingImage} alt="" />
            </div>
            <div className="card-heading">Support</div>
            <div className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="carousel-container">
          <div className="carousel-position">
            <ControlledCarousel />
          </div>
        </div>
        <About />
      </div>
      <Footer />
    </>
  );
}
