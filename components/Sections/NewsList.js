import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import NewsBanner from 'components/Banner/News'
import NewsCard from 'components/Card/NewsCard';
import NewImg from 'assets/images/jpg/news/factory_cover.jpg'
import OutlineButton from 'components/Button/OutlineButton'

const NewsList = () => {
    return (
        <section id="news-list">
            <Container>
                <Row>
                    <Col md="12">
                        <NewsBanner />
                        <div className="news-list">
                            <NewsCard
                                imgSrc={NewImg}
                                date="20 September 2021"
                                edition="limited series"
                                heading="Get ready to live the past with Lamborghini"
                            />
                            <NewsCard
                                imgSrc={NewImg}
                                date="20 September 2021"
                                edition="limited series"
                                heading="Get ready to live the past with Lamborghini"
                            />
                        </div>
                        <div className="text-center text-uppercase news-all">
                            <OutlineButton theme="dark">
                                see all
                            </OutlineButton>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default NewsList;