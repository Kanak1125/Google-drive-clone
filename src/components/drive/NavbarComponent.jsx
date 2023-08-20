import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar expand="sm" bg='light'>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Drive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/user">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent