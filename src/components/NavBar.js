import React, { Component } from 'react'
import { Navbar, Row } from 'react-bootstrap'
import Img from '../assets/inptLogo.png';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand ="lg" variant="dark" fixed="top">
            
                <Navbar.Brand>
                <Row>
                    <img
                        src={Img}
                        width="80vh"
                        height="65vh"
                        padding='0%'
                        max-width='100%'
                        className="img-responsive d-inline-block align-top"
                        alt="Logo"
                        overflow='hidden'
                    /><p>Coding Challenge</p>
                    </Row>
                </Navbar.Brand>
                
            </Navbar>
        )
    }
}