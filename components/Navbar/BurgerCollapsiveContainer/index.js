import DiagonalButton from 'components/Button/DiagonalButton';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap'

let mobileLinks = [
    {
        linkName: 'models',
        arrowRight: true
    },
    {
        linkName: 'custom solutions',
        arrowRight: true
    },
    {
        linkName: 'ownership',
        arrowRight: true
    },
    {
        linkName: 'motorsport',
        arrowRight: true
    },
    {
        linkName: 'dealership'
    },
    {
        linkName: 'museum'
    },
    {
        linkName: 'store'
    },
    {
        linkName: 'design'
    },
    {
        linkName: 'innovation & excellence'
    },
    {
        linkName: 'driving programs'
    },
    {
        linkName: 'lounge'
    },
    {
        linkName: 'club'
    },
    {
        linkName: 'history'
    },
    {
        linkName: 'masterpieces'
    },
    {
        linkName: 'people'
    },
    {
        linkName: 'news'
    }
]

const BurgerCollapsiveContainer = ({ show, toggle, resizeAnimation }) => {

    const [showRightLink, setRightLink] = useState(false)
    const [rootFontSize, setFontSize] = useState(10)

    useEffect(() => {
        document.getElementsByTagName("html")[0].style.fontSize = `${rootFontSize}px`
    }, [rootFontSize])

    const toggleRightContent = (data) => {
        if (data.arrowRight)
            setRightLink(!showRightLink)
    }

    const handleFontSize = (increase = true) => {
        if (increase)
            setFontSize(size => size + 1)
        else
            setFontSize(size => size - 1)
        resizeAnimation()
    }

    return (
        <>
            <div id="burger-container" className={`burger-container collapse-details ${show && "show"}`}>
                <Container fluid className="p-0 position-relative h-100 d-none d-lg-block">
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
                                                <Button
                                                    variant="transparent  shadow-none bg-transparent"
                                                    onClick={() => handleFontSize(false)}
                                                    disabled={rootFontSize === 10}
                                                >
                                                    <i class="fas fa-minus"></i>
                                                </Button>
                                                <Button
                                                    variant="transparent shadow-none  bg-transparent"
                                                    onClick={() => handleFontSize(true)}
                                                    disabled={rootFontSize >= 13}
                                                >
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
                <Container fluid className="p-0 position-relative h-100 d-lg-none d-xl-none d-xxl-none">
                    <Col md="12" className="mx-auto h-100">
                        <div className="mobile-main-content">
                            <div className={`nav-container ${showRightLink ? "active" : ""}`}>
                                <div className={`left nav-list`}>
                                    <ul>
                                        {
                                            mobileLinks.map((data, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => toggleRightContent(data)}
                                                >
                                                    <span>
                                                        {
                                                            data.linkName
                                                        }
                                                    </span>
                                                    {
                                                        data.arrowRight && (
                                                            <i className="icon-chevron-right"></i>
                                                        )
                                                    }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="d-flex align-items-center footer-btn-group">
                                        <span>text size</span>
                                        <div>
                                            <Button
                                                variant="transparent  shadow-none bg-transparent"
                                                onClick={() => handleFontSize(false)}
                                                disabled={rootFontSize === 10}
                                            >
                                                <i class="fas fa-minus"></i>
                                            </Button>
                                            <Button
                                                variant="transparent shadow-none  bg-transparent"
                                                onClick={() => handleFontSize(true)}
                                                disabled={rootFontSize >= 13}
                                            >
                                                <i class="fas fa-plus"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="right nav-list">
                                    <h5 className="back-btn" onClick={() => setRightLink(false)}>
                                        <DiagonalButton
                                            iconName="left-arrow"
                                            width="30px"
                                            height="30px"
                                            className="inline"
                                        />
                                        <span className="d-block ps-3">
                                            Back
                                        </span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <span>
                                                models
                                            </span>
                                            <i className="icon-chevron-right"></i>
                                        </li>
                                        <li>
                                            <span>
                                                custom solutions
                                            </span>
                                            <i className="icon-chevron-right"></i>
                                        </li>
                                        <li>
                                            <span>
                                                ownership
                                            </span>
                                            <i className="icon-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="d-flex align-items-end action-container">
                                    <div className="flex-fill">
                                        <h5 onClick={() => setRightLink(false)}>
                                            <DiagonalButton
                                                iconName="left-arrow"
                                                width="30px"
                                                height="30px"
                                                className="inline"
                                            />
                                            <span className="d-block ps-3">
                                                English
                                            </span>
                                        </h5>
                                    </div>
                                    <div className="flex-fill">
                                        <h5 onClick={() => setRightLink(false)}>
                                            <DiagonalButton
                                                iconName="left-arrow"
                                                width="30px"
                                                height="30px"
                                                className="inline"
                                            />
                                            <span className="d-block ps-3">
                                                social
                                            </span>
                                        </h5>
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