import React from 'react'
import Link from 'next/link'
import { Navbar, Nav, Container } from 'react-bootstrap'


const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Note Taker</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref>
                            <Nav.Link >Home</Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
