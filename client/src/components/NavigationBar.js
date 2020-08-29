import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../utils/helpers";
import logo from "../assets/supora-logo-new.png";

function NavigationBar({ history }) {
  return (
    <>
      <Navbar
        className="nav-background"
        sticky="top"
        collapseOnSelect
        expand="md"
      >
        <Navbar.Brand as={Link} to="/">
          <span className="nav-logo">
            <img alt="" src={logo} width="220" height="50" />
          </span>
          {/* <span className="navbar-brand">Supora</span> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              <span className="navbar-item">Home</span>
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/about-us">
              <span className="navbar-item">About Us</span>
            </Nav.Link> */}
            <Nav.Link as={Link} to="/contact">
              <span className="navbar-item">Contact</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/support">
              <span className="navbar-item">Support</span>
            </Nav.Link>
            {!isAuth() && (
              <>
                <Nav.Link as={Link} to="/signin">
                  <span className="navbar-item">Sign In</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <span className="navbar-item">Sign Up</span>
                </Nav.Link>
              </>
            )}
            {isAuth() && (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <span className="navbar-item">Dashboard</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <span
                    className="navbar-item"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Sign Out
                  </span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default withRouter(NavigationBar);
