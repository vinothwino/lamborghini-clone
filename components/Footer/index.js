import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container fluid={true}>
                <Col xl="10" className="offset-xl-1">
                    <Row>
                        <Col className="nav-link-container web-links order-0">
                            <ul>
                                <li><a href="#">company</a></li>
                                <li><a href="#">career</a></li>
                                <li><a href="#">contact us</a></li>
                                <li><a href="#">media center</a></li>
                                <li><a href="#">privacy & legal</a></li>
                                <li><a href="#">sitemap</a></li>
                                <li><a href="#">newsletter</a></li>
                            </ul>
                        </Col>
                        <Col md="auto" className="socio-links order-3 order-xl-1">
                            <ul>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fab fa-weibo"></i></a></li>
                                <li><a href="#"><i className="far fa-play-circle"></i></a></li>
                                <li><a href="#"><i className="fab fa-weixin"></i></a></li>
                            </ul>
                        </Col>
                        <Col md="12" className="footer-copyright order-2">
                            <p>
                                Copyright © 2021 Automobili Lamborghini S.p.A. a sole shareholder company part of Audi Group.
                            </p>
                            <p>
                                All rights reserved. VAT no. IT 00591801204
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Container>
            <div className="footer-fixed-emission position-fixed fixed-bottom text-center bg-black f-sm text-white fw-300 mb-0 p-2">
                <span>
                    Fuel consumption and emission values of all vehicles promoted on this page -Fuel consumption and emission: 18,0 - 12,7 l/100km ; CO2-emissions combined: 448 g/km - 325 g/km (WLTP)
                </span>
            </div>
        </footer>
    );
}

export default Footer;