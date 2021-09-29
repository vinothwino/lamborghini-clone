import React from 'react';
import { Container, Col } from 'react-bootstrap'
import Models from './Models'
import CustomerSolutions from './CustomerSolutions'

const CollapsiveContainer = (props) => {
    const { selectedNav } = props
    console.log(selectedNav, "nav")
    return (
        <div id="collapsive-container" className="collapse-details">
            <Container fluid className="p-0 position-relative h-100">
                <Col md="12" className="mx-auto h-100">
                    {
                        selectedNav === 'models' && (
                            <Models />
                        )
                    }
                    {
                        selectedNav === 'custom-solution' && (
                            <CustomerSolutions />
                        )
                    }
                </Col>
            </Container>
        </div>
    );
}

export default CollapsiveContainer;