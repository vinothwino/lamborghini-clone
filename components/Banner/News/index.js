import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import LinkButton from 'components/Button/LinkButton'
import OutlineButton from 'components/Button/OutlineButton'

const News = () => {
    return (
        <div className="news-list-banner">
            <h5 className="heading">
                News
            </h5>
            <h2 className="sub-heading">Lamborghini world</h2>
            <img className="img-fluid banner-img" src={require('assets/images/jpg/news/seduta_lamborghini_cover.jpg')} />
            <div className="banner-detail">
                <div className="d-flex flex-column align-items-start">
                    <div className="banner-date d-flex flex-column align-items-start">
                        <time>21 September 2021</time>
                        <LinkButton variant="black">
                            HURACÁN
                        </LinkButton>
                    </div>
                    <Row className="banner-content">
                        <Col md="8">
                            <div>
                                <h5 className="heading">HURACÁN STO: THE “COFANGO”</h5>
                                <p className="desc">
                                    One of the elements that make the Huracán STO one of a kind is the signature Lamborghini “cofango.” The term is a hybrid between the Italian words for “cofano” (“hood”) and “parafango” (“fender”), and it refers to the single piece in the car that incorporates these two areas.
                                </p>
                            </div>
                        </Col>
                        <Col md="4" className="text-md-end">
                            <OutlineButton>
                                read more
                            </OutlineButton>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default News;