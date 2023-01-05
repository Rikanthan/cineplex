import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavigationBar(props) {
    return (
        <div>
            <Navbar bg="dark" expand="md" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Cineplex</Navbar.Brand>
                    <img
                        src={props.url}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="Brand logo" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/films">Films</Nav.Link>
                            <Nav.Link href="/shows">Shows</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Dropdown Item 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Dropdown Item 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Dropdown Item 3</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}