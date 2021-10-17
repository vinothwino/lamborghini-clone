import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap'

const BurgerCollapsiveContainer = ({ show, toggle }) => {
    return (
        <>
            <div id="burger-container" className={`burger-container collapse-details ${show && "show"}`}>
                <Container fluid className="p-0 position-relative h-100 d-none d-xl-block">
                    <Col md="12" className="mx-auto h-100">
                        <div className="main-content">
                            <Row className="gx-0 body">
                                <Col md="" className="list">
                                    <a href="#">
                                        design
                                    </a>
                                    <a href="#">
                                        innovation and excellence
                                    </a>
                                </Col>
                                <Col md="" className="list">
                                    <a href="#">
                                        driving programs
                                    </a>
                                    <a href="#">
                                        lounge
                                    </a>
                                    <a href="#">
                                        club
                                    </a>
                                </Col>
                                <Col md="" className="list">
                                    <a href="#">
                                        history
                                    </a>
                                    <a href="#">
                                        masterpieces
                                    </a>
                                    <a href="#">
                                        people
                                    </a>
                                    <a href="#">
                                        news
                                    </a>
                                </Col>
                            </Row>
                            <Row className="gx-0 footer">
                                <Col md="">
                                    <h6 className="text-uppercase">
                                        languages
                                    </h6>
                                    <div className="list inline">
                                        <a href="#">
                                            english
                                        </a>
                                        <a href="#">
                                            italian
                                        </a>
                                        <a href="#">
                                            french
                                        </a>
                                        <a href="#">
                                            spanish
                                        </a>
                                        <a href="#">
                                            italian
                                        </a>
                                        <a href="#">
                                            french
                                        </a>
                                        <a href="#">
                                            spanish
                                        </a>
                                    </div>
                                </Col>
                                <Col md="">
                                    <h6 className="text-uppercase">
                                        social
                                    </h6>
                                    <div className="list inline socials">
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-youtube"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-weibo"></i>
                                        </a>
                                        <a href="#">
                                            <i class="far fa-play-circle"></i>
                                        </a>
                                        <a href="#">
                                            <i class="fab fa-weixin"></i>
                                        </a>
                                    </div>
                                </Col>
                                <Col md="auto">
                                    <h6 className="text-uppercase">
                                        settings
                                    </h6>
                                    <div>
                                        <div className="d-flex align-items-center footer-btn-group">
                                            <span>text size</span>
                                            <div>
                                                <Button variant="transparent  shadow-none bg-transparent">
                                                    <i class="fas fa-minus"></i>
                                                </Button>
                                                <Button variant="transparent shadow-none  bg-transparent">
                                                    <i class="fas fa-plus"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Container>
                <Container fluid className="p-0 position-relative h-100 d-xl-none d-xxl-none">
                    <Col md="12" className="mx-auto h-100">
                        <div className="mobile-main-content">
                            <ul>
                                <li>
                                    <span>
                                        models
                                    </span>
                                    <i className="icon-chevron-right"></i>
                                </li>
                            </ul>
                            <div className="actions">
                                <div className="d-flex align-items-end">
                                    <div className="flex-fill">
                                        {/* <ul>
                                            <li>
                                                <a href="#">
                                                    <span>models</span>
                                                </a>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Container>
            </div>
            {
                show && <div className="backdrop show" onClick={toggle}></div>
            }
        </>
    );
}

export default BurgerCollapsiveContainer;