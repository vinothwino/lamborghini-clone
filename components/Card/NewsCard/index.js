import React from 'react';
import { Row, Col } from 'react-bootstrap'
import LinkButton from 'components/Button/LinkButton'
import OutlineButton from 'components/Button/OutlineButton'

const NewsCard = (props) => {
    const { imgSrc, date, edition, heading } = props
    return (
        <Row noGutters className="news-card">
            <Col md="6">
                <img src={imgSrc} className="img-fluid" />
            </Col>
            <Col md="6">
                <div className="card-content">
                    <div>
                        <time>{date}</time>
                    </div>
                    <div className="detail">
                        <LinkButton>
                            {edition}
                        </LinkButton>
                        <h5 className="heading">{heading}</h5>
                    </div>
                    <OutlineButton>
                        read more
                    </OutlineButton>
                </div>
            </Col>
        </Row>
    );
}

export default NewsCard;