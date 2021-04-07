import styles from "./navbar.module.css";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  padding: 5px 20px;
  font-size: 20px;
  font-weight: 500;
`;

const CustomNav = () => {
  return (
    <div>
      <Navbar className="shadow-sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/upload">Upload</StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNav;
